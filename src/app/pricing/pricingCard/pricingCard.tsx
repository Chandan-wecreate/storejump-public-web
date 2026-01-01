"use client";

import { memo, useCallback, useState } from "react";

import Carousel from "@/components/carousel/carousel";
import ImageComponent from "@/components/imageComponent/imageComponent";
import IPricingCardPlanProps from "@/app/pricing/pricingCard/interfaces/IPricingCardPlanProps";
import IPricingCardProps from "@/app/pricing/pricingCard/interfaces/IPricingCardProps";
import ThemeButton from "@/components/themeButton/themeButton";
import useBreakpoints from "@/hooks/useBreakpoints";

import styles from "@/app/pricing/pricingCard/pricingCard.styles";

const PricingCard = memo((props: IPricingCardProps) => {
    const [activeCard, setActiveCard] = useState<number>(1);
    const breakpoints = useBreakpoints();

    const renderCard = useCallback((plan: IPricingCardPlanProps, index: number) =>
        <div
            key={index}
            className={styles.card(activeCard === index)}
            onClick={() => setActiveCard(index)}
        >
            <div className={styles.cardInner}>
                <div className={styles.cardInfo}>
                    <h3 className={styles.title}>{plan.title}</h3>
                    <p className={styles.commonText(activeCard === index)}>
                        {plan.description}
                    </p>
                </div>
                <div className={styles.infoWrapper}>
                    <p className={`${styles.commonText(activeCard === index)} ${styles.percentage}`}>
                        Save up to {plan.savePercentage}%
                    </p>
                    <p className={`${styles.commonText(activeCard === index)} ${styles.price}`}>
                        ${props.isMonthly ? plan.monthlyAmount : plan.yearlyAmount}
                        <span className={styles.time}>/{props.isMonthly ? "month" : "year"}</span>
                    </p>
                </div>
                <ThemeButton title="Get Started" className="w-full" />
            </div>
            <div className={styles.divider(activeCard === index)} />
            <div className={styles.featuresWrapper}>
                <p>Features included:</p>
                <div className={styles.featuresInner}>
                    <span className={styles.feature(activeCard === index)}>
                        <ImageComponent
                            url={activeCard === index ? "/images/icons/check_white.svg" : "/images/icons/check_round.svg"}
                            alternativeText="checkmark"
                            width={18}
                            height={18}
                            staticImage
                        />
                        Single store
                    </span>
                </div>
            </div>
        </div >, [activeCard, props.isMonthly]);

    return (
        !breakpoints.LG
            ? <div className={styles.pricingCardWrapper}>
                {props.plans.map(renderCard)}
            </div>
            : <div className={styles.carouselWrapper}>
                <Carousel>
                    {props.plans.map(renderCard)}
                </Carousel>
            </div>
    );
});

export default PricingCard;