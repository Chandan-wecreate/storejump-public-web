"use client";

import { memo } from "react";

import Container from "@/components/container/container";
import Heading from "@/components/heading/heading";
import IScheduleDemoProps from "@/components/scheduleDemo/interfaces/IScheduleDemoProps";
import TextField from "@/components/textField/textField";
import ThemeButton from "@/components/themeButton/themeButton";
import useBreakpoints from "@/hooks/useBreakpoints";
import useInView from "@/hooks/useInView";

import styles from "@/components/scheduleDemo/scheduleDemo.styles";

const STAGGER_DELAY_MS = 110;
const SCHEDULE_DEMO_IN_VIEW_ROOT_MARGIN = "0px";
const SCHEDULE_DEMO_IN_VIEW_THRESHOLD = 0.4;

const ScheduleDemo = memo((props: IScheduleDemoProps) => {
    const { heading } = props;
    const breakpoints = useBreakpoints();
    const { ref: sectionRef, inView } = useInView<HTMLDivElement>({
        rootMargin: SCHEDULE_DEMO_IN_VIEW_ROOT_MARGIN,
        threshold: SCHEDULE_DEMO_IN_VIEW_THRESHOLD,
    });

    const rightAnimationState = inView
        ? styles.animationVisible
        : styles.animationRightHidden;
    const rightAnimatedClassName = `${styles.animationBase} ${rightAnimationState}`;

    return (
        <>
            {props.fullWidth
                ? <div className={styles.containerBg}>
                    <Container>
                        <div className={styles.wrapper(props.fullWidth)} ref={sectionRef}>
                            <div className={`${styles.flexCenter} ${styles.flex1}`}>
                                <Heading
                                    highlightedText={heading.highlightedText}
                                    title={heading.title}
                                    description={heading.description}
                                />
                            </div>
                            <div
                                className={`${styles.textfieldWrapper} ${styles.flex1} ${rightAnimatedClassName}`}
                                style={{ transitionDelay: `${STAGGER_DELAY_MS}ms` }}
                            >
                                <TextField
                                    primary
                                    className={styles.textField}
                                    placeholder="What's your work email?"
                                    renderSuffix={
                                        <div className={styles.buttonWrapper}>
                                            <ThemeButton title="Schedule Your Demo" primary />
                                        </div>
                                    }
                                />
                                {breakpoints.MD && <ThemeButton title="Schedule Your Demo" primary className={styles.button} />}
                            </div>
                        </div>
                    </Container>
                </div>
                : <Container>
                    <div className={styles.wrapper(props.fullWidth)} ref={sectionRef}>
                        <div className={`${styles.flexCenter} ${styles.flex1}`}>
                            <Heading
                                highlightedText={heading.highlightedText}
                                title={heading.title}
                                description={heading.description}
                            />
                        </div>
                        <div
                            className={`${styles.textfieldWrapper} ${styles.flex1} ${rightAnimatedClassName}`}
                            style={{ transitionDelay: `${STAGGER_DELAY_MS}ms` }}
                        >
                            <TextField
                                primary
                                className={styles.textField}
                                placeholder="What's your work email?"
                                renderSuffix={
                                    <div className={styles.buttonWrapper}>
                                        <ThemeButton title="Schedule Your Demo" primary />
                                    </div>
                                }
                            />
                            {breakpoints.MD && <ThemeButton title="Schedule Your Demo" primary className={styles.button} />}
                        </div>
                    </div>
                </Container>}
        </>
    );
});

export default ScheduleDemo;