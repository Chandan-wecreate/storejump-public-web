"use client";

import { memo } from "react";

import IFeatureCardProps from "@/components/featureCard/interfaces/IFeatureCardProps";
import ImageComponent from "@/components/imageComponent/imageComponent";
import useInView from "@/hooks/useInView";

import styles from "@/components/featureCard/featureCard.styles";

const FEATURE_CARD_STAGGER_DELAY_MS = 120;

const FeatureCard = memo((props: IFeatureCardProps) => {
    const { ref: firstCardRef, inView } = useInView<HTMLDivElement>({
        rootMargin: "0px 0px -10% 0px",
    });

    const animationStateClass = inView
        ? styles.animationVisible
        : styles.animationHidden;

    const animatedClassName = `${styles.animationBase} ${animationStateClass}`;

    return props.cards.map((card, index) =>
        <div
            key={index}
            ref={index === 0 ? firstCardRef : undefined}
            className={`${styles.wrapper} ${animatedClassName}`}
            style={{ transitionDelay: `${index * FEATURE_CARD_STAGGER_DELAY_MS}ms` }}
        >
            <ImageComponent {...card.img} className={styles.img} />
            <div className={styles.descriptionWrapper}>
                <span className={styles.colTitle}>{card.title}</span>
                <span className={styles.textGrey}>{card.description}</span>
            </div>
        </div>
    );
});

export default FeatureCard;