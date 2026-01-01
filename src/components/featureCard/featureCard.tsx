import { memo } from "react";

import IFeatureCardProps from "@/components/featureCard/interfaces/IFeatureCardProps";
import ImageComponent from "@/components/imageComponent/imageComponent";

import styles from "@/components/featureCard/featureCard.styles";

const FeatureCard = memo((props: IFeatureCardProps) =>
    props.cards.map((card, index) =>
        <div className={styles.wrapper} key={index}>
            <ImageComponent {...card.img} className={styles.img} />
            <div className={styles.descriptionWrapper}>
                <span className={styles.colTitle}>{card.title}</span>
                <span className={styles.textGrey}>{card.description}</span>
            </div>
        </div>
    )
);

export default FeatureCard;