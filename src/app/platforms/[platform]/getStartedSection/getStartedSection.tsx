"use client";

import { memo } from "react";

import Card from "@/components/card/card";
import Carousel from "@/components/carousel/carousel";
import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import ICardSectionData from "@/types/ICardSectionData";
import useBreakpoints from "@/hooks/useBreakpoints";

import styles from "@/app/platforms/[platform]/getStartedSection/getStarted.styles";

const GetStartedSection = memo((props: ICardSectionData) => {
    const breakpoints = useBreakpoints();

    return (
        <Container>
            <div className={styles.wrapper}>
                <Heading {...props.cardSection.heading} />
                {
                    breakpoints.LG
                        ? <div className={styles.carouselWrapper}>
                            <Carousel>
                                {props.cardSection.card.map((card, index) =>
                                    <Card {...card} id={index + 1} showCount key={index} />
                                )}
                            </Carousel>
                        </div>
                        : <div className={styles.cardsWrapper}>
                            {props.cardSection.card.map((card, index) =>
                                <Card {...card} id={index + 1} showCount key={index} />
                            )}
                        </div>
                }
            </div>
        </Container>
    );
});

export default GetStartedSection;