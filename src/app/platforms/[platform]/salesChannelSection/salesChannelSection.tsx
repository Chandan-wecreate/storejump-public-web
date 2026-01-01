import { memo } from "react";

import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import ICardData from "@/types/ICardData";
import ImageComponent from "@/components/imageComponent/imageComponent";

import styles from "@/app/platforms/[platform]/salesChannelSection/salesChannelSection.styles";

const SalesChannelSection = memo((props: ICardData) =>
    <div className={styles.wrapper}>
        <Container>
            <div className={styles.content}>
                <Heading
                    title={props.title}
                    highlightedText={props.highlightedText}
                    description={props.description}
                    longDescription={props.longDescription}
                />
                <ImageComponent {...props.img} />
            </div>
        </Container>
    </div>
);

export default SalesChannelSection;