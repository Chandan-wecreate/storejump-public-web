import { memo } from "react";

import Container from "@/components/container/container";
import FeatureCard from "@/components/featureCard/featureCard";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";

import styles from "@/components/whatIsStoreJump/whatIsStoreJump.styles";

const WhatIsStoreJump = memo((props: ICardSectionData) => {
    const { cardSection } = props;

    return (
        <Container>
            <div className={styles.wrapper}>
                <div className={styles.leftCol}>
                    <div className={styles.leftColInner}>
                        <Heading
                            highlightedText={cardSection.heading.highlightedText}
                            title={cardSection.heading.title}
                            description={cardSection.heading.description}
                        />
                    </div>
                </div>
                <FeatureCard cards={cardSection.card} />
            </div>
        </Container>
    );
});

export default WhatIsStoreJump;