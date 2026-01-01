"use client";

import { Children, memo, PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

import breakpoints from "@/hooks/enums/breakpoints";

import styles from "@/components/cardStack/cardStack.styles";

gsap.registerPlugin(ScrollTrigger);

const cardSpacing = 40;
const maxScale = 1;
const scaleStep = 0.05;
const lerpStep = 0.6;
const blur = 20;

const CardStack = memo((props: PropsWithChildren) => {
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);
    const scrollPositionRef = useRef(0);
    const totalItems = Children.count(props.children);
    const scalesRef = useRef(new Array<number>(totalItems).fill(1));

    const scaleList = useMemo(() => {
        const scaleFactor = 0.05;
        const firstCardScale = 0.95;

        const count = Children.count(props.children);
        const temp: number[] = [];

        for (let i = 0; i < count; i++) {
            temp.push(i === 0 ? firstCardScale : temp[i - 1] - scaleFactor);
        }

        return temp.reverse();
    }, [props.children]);


    const handleScroll = useCallback(() => {
        if (!breakpoints.MD) return;

        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }

        const cards = cardsRef.current;
        const container = containerRef.current;
        if (!cards || !container || cards.length === 0) return;

        container.style.setProperty("--cards-count", cards.length.toString());
        container.style.setProperty("--card-height", `${cards[0].clientHeight}px`);
        const wrapper = document.querySelector(".main-wrapper") as HTMLDivElement;
        const deltaY = wrapper.scrollTop - scrollPositionRef.current;
        scrollPositionRef.current = wrapper.scrollTop;

        animationFrameRef.current = requestAnimationFrame(() => {
            cards.forEach((card, i) => {
                card.style.paddingTop = `${cardSpacing * i}px`;
                const currentCard = card.querySelector(".card-root") as HTMLDivElement;
                const currentCardRect = currentCard.getBoundingClientRect();
                const img = currentCard.querySelector(".card-img") as HTMLImageElement;
                const currentCardTitle = currentCard.querySelector(".card-content") as HTMLHeadingElement;
                const currentCardTitlePlaceholder = currentCardTitle.nextSibling as HTMLHeadingElement;
                const currentCardDesc = currentCard.querySelector(".card-desc") as HTMLParagraphElement;
                const currentCardDescRect = currentCardDesc.getBoundingClientRect();

                let newBlur = 0;
                const minScale = scaleList[i + 1];
                const nextCard = cards[i + 1]?.querySelector(".card-root");

                const cardRect = card.getBoundingClientRect();
                const nextRect = cards[i + 1]?.getBoundingClientRect();

                if (nextCard) {
                    const nextCardRect = nextCard.getBoundingClientRect();
                    const titlePaddingDiff = 50;
                    const isNextCardReachedToDesc = nextCardRect.top <= currentCardDescRect.top + titlePaddingDiff;
                    const isCurrentCardSticked = cardRect.top > container.getBoundingClientRect().top;
                    const isNextCardReachedToCard = nextRect.top <= cardRect.bottom;

                    if (isNextCardReachedToCard) {
                        if (deltaY > 0) {
                            const newScale = scalesRef.current[i] - scaleStep;
                            const smoothScale = gsap.utils.interpolate(scalesRef.current[i], newScale, lerpStep);
                            scalesRef.current[i] = smoothScale >= minScale ? smoothScale : minScale;
                        }
                    } else {
                        if (deltaY <= 0) {
                            if (isCurrentCardSticked) {
                                const newScale = scalesRef.current[i] + scaleStep;
                                const smoothScale = gsap.utils.interpolate(scalesRef.current[i], newScale, lerpStep);
                                scalesRef.current[i] = smoothScale <= maxScale ? smoothScale : maxScale;
                            } else {
                                scalesRef.current[i] = maxScale;
                            }
                        }
                    }

                    gsap.to(card, {
                        duration: 0.05,
                        scale: scalesRef.current[i],
                        overwrite: true
                    });

                    if (isNextCardReachedToDesc) {
                        const minTop = 6;
                        const newTop = nextCardRect.top - currentCardRect.top - cardSpacing;
                        currentCardTitle.style.setProperty("--cardTitleTop", `${newTop < minTop ? minTop + i : newTop}px`);
                        currentCardTitle.style.position = "absolute";
                        currentCardTitle.style.textShadow = "0 0 2px #FFF";
                        currentCardTitlePlaceholder.classList.remove("hidden");
                        newBlur = wrapper.scrollTop / blur;
                    } else {
                        currentCardTitle.style.setProperty("--cardTitleTop", "0");
                        currentCardTitle.style.position = "relative";
                        currentCardTitle.style.textShadow = "none";
                        currentCardTitlePlaceholder.classList.add("hidden");
                        newBlur = 0;
                    }
                    img.style.filter = `blur(${newBlur}px)`;
                }
            });
        });
    }, [scaleList]);

    useEffect(() => {
        if (totalItems < 1) return;

        const wrapper = document.querySelector(".main-wrapper");

        if (wrapper && breakpoints.MD) {
            handleScroll();
            wrapper.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (wrapper) {
                wrapper.removeEventListener("scroll", handleScroll);
            }
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [handleScroll, totalItems]);

    const setCardRef = useCallback((el: HTMLDivElement | null, index: number) => {
        if (el) {
            cardsRef.current[index] = el;
        }
    }, []);

    const marginBottom = useMemo(() => totalItems > 0 ? `calc(25px*${totalItems})` : "", [totalItems]);

    useEffect(() => () => {
        gsap.killTweensOf("*");
    }, []);

    return (
        <div
            className={styles.mobileContainer}
            ref={containerRef}
            style={marginBottom ? { marginBottom } : undefined}
        >
            {Children.map(props.children, (child, index) =>
                <div
                    key={index}
                    ref={(el) => setCardRef(el, index)}
                    className={styles.sticky}
                    style={index === 0 ? { paddingTop: breakpoints.MD ? "20px" : "0" } : undefined}
                >
                    {child}
                </div>
            )}
        </div>
    );
});

export default CardStack;