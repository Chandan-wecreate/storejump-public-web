import { RefObject, useEffect, useRef, useState } from "react";

type UseInViewOptions = {
    rootMargin?: string;
    threshold?: number | number[];
    once?: boolean;
};

const DEFAULT_ROOT_MARGIN = "0px 0px -60% 0px";
const DEFAULT_THRESHOLD = 0;

export default function useInView<T extends HTMLElement>(
    options: UseInViewOptions = {}
): { ref: RefObject<T | null>; inView: boolean } {
    const { rootMargin = DEFAULT_ROOT_MARGIN, threshold = DEFAULT_THRESHOLD, once = true } = options;

    const [inView, setInView] = useState(() =>
        typeof window !== "undefined" && typeof IntersectionObserver === "undefined"
    );

    const ref = useRef<T | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        if (typeof IntersectionObserver === "undefined") return;
        if (once && inView) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                if (entry.isIntersecting) {
                    setInView(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setInView(false);
                }
            },
            {
                rootMargin,
                threshold,
            }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [inView, once, rootMargin, threshold]);

    return { ref, inView };
}
