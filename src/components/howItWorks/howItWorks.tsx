"use client";

import { memo, useCallback, useMemo, useRef } from "react";

import CardStack from "@/components/cardStack/cardStack";
import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";
import ImageComponent from "@/components/imageComponent/imageComponent";
import useBreakpoints from "@/hooks/useBreakpoints";
import useInView from "@/hooks/useInView";
import usePinnedStaggerReveal from "@/hooks/usePinnedStaggerReveal";

import styles from "@/components/howItWorks/howItWorks.styles";

const HOW_IT_WORKS_SCROLL_PER_ITEM_PX = 420;
const HOW_IT_WORKS_CARD_STAGGER = 1;
const HOW_IT_WORKS_CARD_FROM_Y = 36;

const HowItWorks = memo(({ cardSection }: ICardSectionData) => {
    const { card, heading } = cardSection;
    const breakpoints = useBreakpoints();
    const isMobile = breakpoints.MD;
    const sectionRef = useRef<HTMLDivElement>(null);

    const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({
        once: false,
        rootMargin: "0px 0px 0px 0px",
    });

    usePinnedStaggerReveal(sectionRef, {
        enabled: !isMobile,
        itemSelector: "[data-howitworks-card]",
        scrollPerItemPx: HOW_IT_WORKS_SCROLL_PER_ITEM_PX,
        stagger: HOW_IT_WORKS_CARD_STAGGER,
        fromVars: { y: HOW_IT_WORKS_CARD_FROM_Y },
        toVars: { y: 0 },
    });

    const cardWrapperClassName = useMemo(
        () => !isMobile ? styles.scrollCard : "",
        [isMobile]
    );

    const renderCard = useCallback((mobile: boolean) => card.map((c, idx) =>
        <div
            key={idx}
            data-howitworks-card
            className={cardWrapperClassName}
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
    ), [card, cardWrapperClassName, isMobile]);

    return (
        <Container>
            <div className={styles.wrapper} ref={sectionRef}>
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