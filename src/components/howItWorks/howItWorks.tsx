"use client";

import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";

import CardStack from "@/components/cardStack/cardStack";
import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";
import ImageComponent from "@/components/imageComponent/imageComponent";
import useBreakpoints from "@/hooks/useBreakpoints";
import useInView from "@/hooks/useInView";

import styles from "@/components/howItWorks/howItWorks.styles";

const HOW_IT_WORKS_REVEAL_STAGGER = 0.7;
const HOW_IT_WORKS_REVEAL_DURATION = 0.5;
const HOW_IT_WORKS_REVEAL_FROM_Y = 14;

const HowItWorks = memo(({ cardSection }: ICardSectionData) => {
    const { card, heading } = cardSection;
    const breakpoints = useBreakpoints();
    const isMobile = breakpoints.MD;
    const sectionRef = useRef<HTMLDivElement>(null);
    const hasRevealedRef = useRef(false);

    const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({
        once: true,
        rootMargin: "0px 0px 0px 0px",
    });

    const { ref: revealRef, inView: revealInView } = useInView<HTMLDivElement>({
        once: true,
        rootMargin: "0px 0px -70% 0px",
        threshold: 0,
    });

    useEffect(() => {
        if (!revealInView) return;
        if (hasRevealedRef.current) return;

        const container = sectionRef.current;
        if (!container) return;

        const items = Array.from(container.querySelectorAll("[data-howitworks-card]"));
        if (items.length === 0) return;

        hasRevealedRef.current = true;

        const ctx = gsap.context(() => {
            gsap.set(items, {
                opacity: 0.4,
                filter: "grayscale(1)",
                y: HOW_IT_WORKS_REVEAL_FROM_Y,
            });

            gsap.to(items, {
                opacity: 1,
                filter: "grayscale(0)",
                y: 0,
                duration: HOW_IT_WORKS_REVEAL_DURATION,
                stagger: HOW_IT_WORKS_REVEAL_STAGGER,
                ease: "power2.out",
                overwrite: true,
            });
        }, container);

        return () => ctx.revert();
    }, [revealInView]);

    const cardWrapperClassName = useMemo(
        () => !isMobile ? styles.scrollCard : "",
        [isMobile]
    );

    const renderCard = useCallback((mobile: boolean) => card.map((c, idx) =>
        <div
            key={idx}
            data-howitworks-card
            className={`${styles.revealCardBase} ${cardWrapperClassName}`}
        >
            <div className={mobile ? styles.carouselItem : styles.card}>
                <div className={styles.imageWrapper}>
                    <ImageComponent {...c.img} className={styles.img} />
                </div>
                <div className={styles.cardInfoWrapper}>
                    {mobile
                        ? <>
                            <h3 className={styles.cardTitle(false)}>{c.title}</h3>
                            <h3 className={`${styles.cardTitle(isMobile)}`}>
                                {c.title}123
                            </h3>
                        </>
                        : <span className={styles.cardTitle(false)}>{c.title}</span>
                    }
                    <span className={styles.cardDescription}>{c.description}</span>
                </div>
            </div>
        </div>
    ), [card, cardWrapperClassName, isMobile]);

    return (
        <Container>
            <div
                className={styles.wrapper}
                ref={(node) => {
                    sectionRef.current = node;
                    (revealRef as unknown as { current: HTMLDivElement | null }).current = node;
                }}
            >
                <div className={styles.infoGrid}>
                    <div
                        ref={headingRef}
                        className={`
                            ${styles.animationBase} 
                            ${headingInView ? styles.animationVisible : styles.animationHidden}`
                        }
                    >
                        <Heading highlightedText={heading.highlightedText} title={heading.title} />
                    </div>
                </div>
                {
                    isMobile
                        ? <CardStack>{renderCard(true)}</CardStack>
                        : <div className={styles.cardsWrapper}>{renderCard(false)}</div>
                }
            </div>
        </Container>
    );
});

export default HowItWorks;