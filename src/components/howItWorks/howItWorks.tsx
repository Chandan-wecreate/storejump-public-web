"use client";

import { memo, useCallback } from "react";

import CardStack from "@/components/cardStack/cardStack";
import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";
import ImageComponent from "@/components/imageComponent/imageComponent";
import useBreakpoints from "@/hooks/useBreakpoints";
import useInView from "@/hooks/useInView";

import styles from "@/components/howItWorks/howItWorks.styles";

const CARD_STAGGER_DELAY_MS = 1000;

const HowItWorks = memo(({ cardSection }: ICardSectionData) => {
    const { card, heading } = cardSection;
    const breakpoints = useBreakpoints();
    const isMobile = breakpoints.MD;
    const { ref: sectionRef, inView } = useInView<HTMLDivElement>();

    const animationStateClass = inView
        ? styles.animationVisible
        : styles.animationHidden;

    const animatedClassName = `${styles.animationBase} ${animationStateClass}`;

    const renderCard = useCallback((mobile: boolean) => card.map((c, idx) => {
        const cardDelayMs = idx * CARD_STAGGER_DELAY_MS;

        return (
            <div
                key={idx}
                className={animatedClassName}
                style={{ transitionDelay: `${cardDelayMs}ms` }}
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
                                    {c.title}
                                </h3>
                            </>
                            : <span className={styles.cardTitle(false)}>{c.title}</span>
                        }
                        <span className={styles.cardDescription}>{c.description}</span>
                    </div>
                </div>
            </div>
        );
    }), [animatedClassName, card, isMobile]);

    return (
        <Container>
            <div className={styles.wrapper} ref={sectionRef}>
                <div className={styles.infoGrid}>
                    <Heading highlightedText={heading.highlightedText} title={heading.title} />
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