"use client";

import { memo } from "react";

import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import IHeroSectionProps from "@/components/heroSection/interfaces/IHeroSectionProps";
import ImageComponent from "@/components/imageComponent/imageComponent";
import ImageTicker from "@/components/imageTicker/imageTicker";
import ThemeButton from "@/components/themeButton/themeButton";
import useInView from "@/hooks/useInView";

import styles from "@/components/heroSection/heroSection.styles";

const STAGGER_DELAY_MS = 110;
const STAGGER_1 = 1;
const STAGGER_2 = 2;
const STAGGER_3 = 3;

const HeroSection = memo((props: IHeroSectionProps) => {
    const { ref: sectionRef, inView: hasEnteredView } = useInView<HTMLDivElement>();

    const animationStateClass = hasEnteredView
        ? styles.contentAnimationVisible
        : styles.contentAnimationHidden;

    const animatedClassName = `${styles.contentAnimationBase} ${animationStateClass}`;

    const heroImageAnimationStateClass = hasEnteredView
        ? styles.heroImageAnimationVisible
        : styles.heroImageAnimationHidden;

    const heroImageAnimatedClassName = `${styles.contentAnimationBase} ${heroImageAnimationStateClass}`;

    return (
        <Container>
            <div className={styles.wrapper} ref={sectionRef}>
                <div className={styles.heroSection}>
                    <div className={animatedClassName}>
                        <Heading
                            title={props.heading?.title}
                            highlightedText={props.heading?.highlightedText}
                            primary
                            description={props.heading?.description}
                            longDescription={props.heading?.longDescription}
                        />
                    </div>

                    <div
                        className={animatedClassName}
                        style={{ transitionDelay: `${STAGGER_DELAY_MS}ms` }}
                    >
                        <div className={styles.buttonWrapper}>
                            <ThemeButton title={props.buttonText || ""} primary />
                        </div>
                    </div>

                    {props.platforms &&
                        <div
                            className={animatedClassName}
                            style={{ transitionDelay: `${STAGGER_DELAY_MS * STAGGER_2}ms` }}
                        >
                            <ImageTicker images={props.platforms.images} />
                        </div>
                    }

                    {props.features &&
                        <div
                            className={animatedClassName}
                            style={{ transitionDelay: `${STAGGER_DELAY_MS * STAGGER_3}ms` }}
                        >
                            <div className={styles.featureWrapper}>
                                {props.features.map((item, index) =>
                                    <div key={index} className={styles.feature}>
                                        <ImageComponent
                                            url="/images/icons/check.svg"
                                            alternativeText="check-icon"
                                            width={0}
                                            height={0}
                                            className={styles.featureImg}
                                            staticImage
                                        />
                                        {item.feature}
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>

                {props.heroImg && (() => {
                    const heroImgWrapperClass = styles.heroImgWrapper(props.hideImgOnMobile);
                    const heroImgClassName = `${heroImgWrapperClass} ${heroImageAnimatedClassName}`;
                    return (
                        <div
                            className={heroImgClassName}
                            style={{ transitionDelay: `${STAGGER_DELAY_MS * STAGGER_1}ms` }}
                        >
                            <ImageComponent {...props.heroImg} className={styles.imageWrapper} />
                        </div>
                    );
                })()}
            </div>
        </Container>
    );
});

export default HeroSection;