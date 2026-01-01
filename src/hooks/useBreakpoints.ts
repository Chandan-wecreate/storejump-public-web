import { useEffect, useState } from "react";
import Breakpoints from "@/hooks/enums/breakpoints";

type BreakpointKey = keyof typeof Breakpoints;
type BreakpointState = Record<BreakpointKey, boolean>;

const breakpointKeys = Object.keys(Breakpoints).filter(
    (key): key is BreakpointKey => isNaN(Number(key))
);

export default function useBreakpoints(
    isLessOrEqual = true
): BreakpointState {
    const [matchesObj, setMatchesObj] = useState<BreakpointState>(() => {
        const initial = {} as BreakpointState;

        if (typeof window !== "undefined") {
            for (const key of breakpointKeys) {
                const bp = Breakpoints[key];
                const query = isLessOrEqual
                    ? `(max-width: ${bp}px)`
                    : `(min-width: ${bp + 1}px)`;

                initial[key] = window.matchMedia(query).matches;
            }
        }

        return initial;
    });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const subs: { list: MediaQueryList; callback: (e: MediaQueryListEvent) => void }[] = [];

        for (const key of breakpointKeys) {
            const bp = Breakpoints[key];
            const query = isLessOrEqual
                ? `(max-width: ${bp}px)`
                : `(min-width: ${bp + 1}px)`;

            const mql = window.matchMedia(query);

            const handler = (e: MediaQueryListEvent) => {
                setMatchesObj(prev =>
                    prev[key] === e.matches
                        ? prev
                        : { ...prev, [key]: e.matches }
                );
            };

            mql.addEventListener("change", handler);
            subs.push({ list: mql, callback: handler });
        }

        return () => {
            subs.forEach(({ list, callback }) =>
                list.removeEventListener("change", callback)
            );
        };
    }, [isLessOrEqual]);

    return matchesObj;
}