import { memo } from "react";

import Container from "@/components/container/container";
import FeatureCard from "@/components/featureCard/featureCard";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";

import styles from "@/app/platforms/[platform]/whyJumpStoreSection/whyJumpStoreSection.styles";

const whyJumpStoreSection = memo((props: ICardSectionData) =>
    <div className={styles.wrapper}>
        <Container>
            <div className={styles.content}>
                <Heading {...props.cardSection.heading} />
                <div className={styles.features}>
                    <FeatureCard cards={props.cardSection.card} />
                </div>
            </div>
        </Container>
    </div>
);

export default whyJumpStoreSection;