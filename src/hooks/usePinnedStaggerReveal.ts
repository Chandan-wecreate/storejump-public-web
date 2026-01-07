"use client";

import { RefObject, useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_SCROLL_PER_ITEM_PX = 350;
const DEFAULT_STAGGER = 0.25;
const DEFAULT_INITIAL_Y = 28;

type UsePinnedStaggerRevealOptions = {
    /** CSS selector within the container for the items to animate */
    itemSelector: string;

    /** Optional CSS selector (within the container) to use as the ScrollTrigger trigger */
    triggerSelector?: string;

    /** If provided, ScrollTrigger will use this element as its scroller */
    scrollerSelector?: string;

    /** ScrollTrigger start position */
    start?: string;

    /** Pixels of scroll reserved per item while pinned */
    scrollPerItemPx?: number;

    /** Pins the container while animating */
    pin?: boolean;

    /** Scrubs animation with scroll */
    scrub?: boolean | number;

    /** Stagger between items */
    stagger?: number;

    /** Initial tween vars (merged with autoAlpha: 0) */
    fromVars?: gsap.TweenVars;

    /** Target tween vars (merged with autoAlpha: 1) */
    toVars?: gsap.TweenVars;

    /** Disable hook without changing callsites */
    enabled?: boolean;
};

const DEFAULT_SCROLLER_SELECTOR = ".main-wrapper";

export default function usePinnedStaggerReveal(
    containerRef: RefObject<HTMLElement | null>,
    {
        itemSelector,
        triggerSelector,
        scrollerSelector = DEFAULT_SCROLLER_SELECTOR,
        start = "top top",
        scrollPerItemPx = DEFAULT_SCROLL_PER_ITEM_PX,
        pin = true,
        scrub = true,
        stagger = DEFAULT_STAGGER,
        fromVars,
        toVars,
        enabled = true,
    }: UsePinnedStaggerRevealOptions
) {
    useLayoutEffect(() => {
        if (!enabled) return;

        const container = containerRef.current;
        if (!container) return;

        const items = Array.from(container.querySelectorAll(itemSelector));
        if (items.length === 0) return;

        const triggerElement = (triggerSelector
            ? (container.querySelector(triggerSelector) as HTMLElement | null)
            : null) ?? container;

        const scroller = (scrollerSelector
            ? document.querySelector(scrollerSelector)
            : null) as HTMLElement | null;

        const ctx = gsap.context(() => {
            gsap.set(items, {
                autoAlpha: 0,
                y: DEFAULT_INITIAL_Y,
                ...fromVars,
            });

            const totalScroll = Math.max(items.length * scrollPerItemPx, scrollPerItemPx);

            const tl = gsap.timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                    trigger: triggerElement,
                    scroller: scroller ?? undefined,
                    start,
                    end: `+=${totalScroll}`,
                    pin: pin ? container : false,
                    scrub,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(items, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                stagger,
                ...toVars,
            });
        }, container);

        return () => {
            ctx.revert();
        };
    }, [
        containerRef,
        enabled,
        itemSelector,
        triggerSelector,
        scrollerSelector,
        start,
        scrollPerItemPx,
        pin,
        scrub,
        stagger,
        fromVars,
        toVars,
    ]);
}
