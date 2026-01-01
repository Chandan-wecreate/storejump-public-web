"use client";

import { memo, useState } from "react";

import Heading from "@/components/heading/heading";
import IPriceSectionProps from "@/app/pricing/pricingSection/interfaces/IPriceSectionProps";
import PricingCard from "@/app/pricing/pricingCard/pricingCard";
import SwitchField from "@/components/switchField/switchField";

import styles from "@/app/pricing/pricingSection/pricingSection.styles";

const PricingSection = memo((props: IPriceSectionProps) => {
    const [isMonthly, setIsMonthly] = useState(true);

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.hero}>
                    <Heading {...props.heading} descriptionClassName={styles.description} />
                </div>
                <div className={styles.switchWrapper}>
                    <SwitchField label="Monthly" afterLabel="Annually" onChange={(checked) => setIsMonthly(!checked)} />
                </div>
                <PricingCard plans={props.pricing} isMonthly={isMonthly} />
            </div>
        </div>
    );
});

export default PricingSection;