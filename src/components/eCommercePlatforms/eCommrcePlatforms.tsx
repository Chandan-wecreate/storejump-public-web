"use client";

import { memo, useLayoutEffect, useState } from "react";

import Card from "@/components/card/card";
import Carousel from "@/components/carousel/carousel";
import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";
import useInView from "@/hooks/useInView";

import styles from "@/components/eCommercePlatforms/eCommercePlatforms.styles";

const spacing = 50;
const STAGGER_DELAY_MS = 200;

const ECommercePlatforms = memo((props: ICardSectionData) => {
    const { cardSection } = props;
    const [rightSpacing, setRightSpacing] = useState(0);
    const { ref: sectionRef, inView: cardsInView } = useInView<HTMLDivElement>({ once: true, rootMargin: "0px 0px -20% 0px" });
    const { ref: headingRef, inView: headingInView } = useInView<HTMLDivElement>({
        once: true,
        rootMargin: "0px 0px 0px 0px",
    });

    useLayoutEffect(() => {
        const updateSpacing = () => {
            const el = document.querySelector(".carousel-wrapper");
            if (!el) return;

            const left = el.getBoundingClientRect().left;
            setRightSpacing(left + spacing);
        };

        updateSpacing();
        window.addEventListener("resize", updateSpacing);

        return () => window.removeEventListener("resize", updateSpacing);
    }, []);

    return (
        <Container>
            <div className={styles.wrapper} ref={sectionRef}>
                <div
                    ref={headingRef}
                    className={
                        `${styles.cardAnimationBase} 
                        ${headingInView ? styles.cardAnimationVisible : styles.cardAnimationHidden}`
                    }
                >
                    <Heading highlightedText={cardSection.heading.highlightedText} title={cardSection.heading.title} />
                </div>
                <div className={styles.carouselWrapper} style={{ marginRight: `-${rightSpacing}px` }}>
                    <Carousel>
                        {cardSection.card.map((card, index) => {
                            const animationStateClass = cardsInView
                                ? styles.cardAnimationVisible
                                : styles.cardAnimationHidden;

                            return (
                                <div
                                    key={index}
                                    className={`${styles.cardAnimationBase} ${animationStateClass}`}
                                    style={{ transitionDelay: `${index * STAGGER_DELAY_MS}ms` }}
                                >
                                    <Card {...card} />
                                </div>
                            );
                        })}
                    </Carousel>
                </div>
            </div>
        </Container>
    );
});


export default ECommercePlatforms;