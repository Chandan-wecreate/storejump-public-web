"use client";

import { Children, memo, PropsWithChildren, useCallback, useEffect, useEffectEvent, useMemo, useRef, useState } from "react";

import ImageComponent from "@/components/imageComponent/imageComponent";

import styles from "@/components/carousel/carousel.styles";

const DRAG_THRESHOLD = 50;
const EDGE_GAP = 10;
const DEFAULT_SPACING = 30;
const MIN_ITEMS_PER_PAGE = 1;
const initailItemsPerPage = 2;
const DRAG_THRESHOLD_RATIO = 0.25;

const Carousel = memo((props: PropsWithChildren) => {
    const [navigateCounter, setNavigateCounter] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(initailItemsPerPage);

    const totalItems = Children.count(props.children);

    const carouselRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const dragStartX = useRef(0);
    const dragDeltaX = useRef(0);
    const isDragging = useRef(false);

    const maxNavigateCounter = useMemo(() => Math.max(0, totalItems - itemsPerPage), [totalItems, itemsPerPage]);

    const isFirstItemShowing = navigateCounter === 0;
    const isLastItemShowing = navigateCounter >= maxNavigateCounter;

    const getGap = useCallback(() => {
        const track = carouselRef.current?.firstElementChild as HTMLElement | null;
        if (!track) return DEFAULT_SPACING;
        const style = window.getComputedStyle(track);
        const raw = style.columnGap || style.gap || `${DEFAULT_SPACING}`;
        const gap = parseInt(raw, 10);
        return Number.isNaN(gap) ? DEFAULT_SPACING : gap;
    }, []);

    useEffect(() => {
        const wrapper = containerRef.current;
        const track = carouselRef.current?.firstElementChild as HTMLElement | null;
        if (!wrapper || !track) return;

        const update = () => {
            const wrapper = containerRef.current;
            const track = carouselRef.current?.firstElementChild as HTMLElement | null;
            if (!wrapper || !track) return;

            const firstItem = track.firstElementChild as HTMLElement | null;
            if (!firstItem) return;

            const gap = getGap();
            const itemWidth = firstItem.clientWidth + gap;
            const containerWidth = wrapper.clientWidth;
            const calculated = Math.floor(containerWidth / itemWidth);
            setItemsPerPage(Math.max(MIN_ITEMS_PER_PAGE, calculated));
        };

        const ro = new ResizeObserver(update);
        ro.observe(wrapper);
        ro.observe(track);

        const firstItem = track.firstElementChild as HTMLElement | null;
        if (firstItem) ro.observe(firstItem);

        update();
        return () => ro.disconnect();
    }, [getGap]);

    const handlePrev = useCallback(() => {
        setNavigateCounter((prev) => Math.max(0, prev - itemsPerPage));
    }, [itemsPerPage]);

    const handleNext = useCallback(() => {
        setNavigateCounter((prev) => Math.min(maxNavigateCounter, prev + itemsPerPage));
    }, [itemsPerPage, maxNavigateCounter]);

    const startDrag = useCallback((clientX: number) => {
        isDragging.current = true;
        dragStartX.current = clientX;
        dragDeltaX.current = 0;
    }, []);

    const updateDrag = useCallback((clientX: number) => {
        if (!isDragging.current) return;
        dragDeltaX.current = clientX - dragStartX.current;
    }, []);

    const endDrag = useCallback(() => {
        if (!isDragging.current) return;
        const wrapper = carouselRef.current;
        const track = wrapper?.firstElementChild as HTMLElement | null;
        const firstItem = track?.firstElementChild as HTMLElement | null;
        const gap = getGap();
        const itemSpan = (firstItem?.clientWidth || 0) + gap;
        const threshold = itemSpan ? itemSpan * DRAG_THRESHOLD_RATIO : DRAG_THRESHOLD;

        if (dragDeltaX.current > threshold && !isFirstItemShowing) handlePrev();
        else if (dragDeltaX.current < -threshold && !isLastItemShowing) handleNext();

        isDragging.current = false;
        dragDeltaX.current = 0;
    }, [getGap, isFirstItemShowing, isLastItemShowing, handlePrev, handleNext]);

    const onMouseDown = useCallback(
        (e: React.MouseEvent) => {
            startDrag(e.clientX);
        },
        [startDrag]
    );

    const onMouseMove = useCallback(
        (e: React.MouseEvent) => {
            updateDrag(e.clientX);
            if (isDragging.current) e.preventDefault();
        },
        [updateDrag]
    );

    const onTouchStart = useCallback((e: React.TouchEvent) => startDrag(e.touches[0].clientX), [
        startDrag,
    ]);
    const onTouchMove = useCallback((e: React.TouchEvent) => updateDrag(e.touches[0].clientX), [
        updateDrag,
    ]);

    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        const preventEdgeSwipe = (e: TouchEvent) => {
            const touchX = e.touches[0].clientX;
            if ((touchX < EDGE_GAP || touchX > window.innerWidth - EDGE_GAP) && isDragging.current)
                e.preventDefault();
        };

        carousel.addEventListener("touchmove", preventEdgeSwipe, { passive: false });
        return () => carousel.removeEventListener("touchmove", preventEdgeSwipe);
    }, []);

    useEffect(() => {
        const wrapper = carouselRef.current;
        if (!wrapper) return;
        const track = wrapper.firstElementChild as HTMLElement | null;
        if (!track) return;
        const firstItem = track.firstElementChild as HTMLElement | null;
        if (!firstItem) return;

        const gap = getGap();
        const scrollPosition = navigateCounter * (firstItem.clientWidth + gap);
        const maxScroll = track.scrollWidth - wrapper.clientWidth;

        wrapper.scrollTo({
            left: Math.min(scrollPosition, maxScroll),
            behavior: "smooth",
        });
    }, [navigateCounter, getGap]);

    useEffectEvent(() => {
        const max = Math.max(0, totalItems - itemsPerPage);
        if (navigateCounter > max) {
            setNavigateCounter(max);
        }
    });

    return (
        <div className={styles.carouselWrapper} ref={containerRef}>
            <div ref={carouselRef} className={styles.mobileWrapper}>
                <div
                    className={styles.carousel}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={endDrag}
                    onMouseLeave={endDrag}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={endDrag}
                >
                    {Children.map(props.children, (child, index) =>
                        <div
                            data-carousel-item
                            className={styles.carouselItem(index === totalItems - 1)}
                            key={index}
                        >
                            {child}
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.arrowWrapper}>
                <button
                    type="button"
                    aria-label="Previous"
                    aria-disabled={isFirstItemShowing}
                    disabled={isFirstItemShowing}
                    className={styles.arrowButton(isFirstItemShowing)}
                    onClick={handlePrev}
                >
                    <ImageComponent
                        url="/images/icons/arrow.svg"
                        width={20}
                        height={20}
                        alternativeText="arrow-left"
                        className={styles.arrowButtonIcon}
                        staticImage
                    />
                </button>
                <button
                    type="button"
                    aria-label="Next"
                    aria-disabled={isLastItemShowing}
                    disabled={isLastItemShowing}
                    className={styles.arrowButton(isLastItemShowing)}
                    onClick={handleNext}
                >
                    <ImageComponent
                        url="/images/icons/arrow.svg"
                        width={20}
                        height={20}
                        alternativeText="arrow-right"
                        className={`${styles.arrowButtonIcon} ${styles.arrowButtonIconRight}`}
                        staticImage
                    />
                </button>
            </div>
        </div >
    );
});

export default Carousel;