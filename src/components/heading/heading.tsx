"use client";

import { Fragment, memo, useEffect, useMemo, useRef, useState } from "react";

import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";

import styles from "@/components/heading/heading.styles";

const LONG_DESCRIPTION_DELAY_MS = 1500;
const HIGHLIGHT_GRADIENT_DELAY_MS = 700;

const AnimatedHighlightedText = memo(({ text }: { text: string }) => {
    const [isGradientVisible, setIsGradientVisible] = useState(false);
    const [isShifted, setIsShifted] = useState(false);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsGradientVisible(true), HIGHLIGHT_GRADIENT_DELAY_MS);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!isGradientVisible) {
            return;
        }

        const rafId = requestAnimationFrame(() => setIsShifted(true));
        return () => cancelAnimationFrame(rafId);
    }, [isGradientVisible]);

    return (
        <span className="relative inline-block">
            <span
                className={`${styles.secondaryText} transition-opacity duration-500 ease-in-out ${isGradientVisible ? "opacity-0" : "opacity-100"}`}
            >
                {text}
            </span>
            <span
                className={`${styles.gradientTextAnimated} absolute inset-0 transition-opacity duration-500 ease-in-out ${isGradientVisible ? "opacity-100" : "opacity-0"}`}
                style={{ backgroundPosition: isShifted ? "100% 50%" : "0% 50%" }}
                aria-hidden="true"
            >
                {text}
            </span>
        </span>
    );
});

const DelayedLongDescription = memo(({ text }: { text: string }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [measuredMaxHeight, setMeasuredMaxHeight] = useState("0px");
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const timeoutId = setTimeout(() => setIsVisible(true), LONG_DESCRIPTION_DELAY_MS);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (!isVisible) {
            return;
        }

        const rafId = requestAnimationFrame(() => {
            const nextHeight = paragraphRef.current?.scrollHeight ?? 0;
            setMeasuredMaxHeight(`${nextHeight}px`);
        });

        return () => cancelAnimationFrame(rafId);
    }, [isVisible, text]);

    return (
        <p
            ref={paragraphRef}
            className={`${styles.description(false, false)} ${styles.longDescriptionTransition} ${isVisible ? "opacity-100" : "opacity-0"}`}
            style={{ maxHeight: isVisible ? measuredMaxHeight : "0px" }}
        >
            {text}
        </p>
    );
});

const Heading = memo((props: IHeadingProps) => {
    const { highlightedText, title, primary, className, description, descriptionClassName, longDescription } = props;

    const formattedTitle = useMemo(() => {
        if (!highlightedText) {
            return title || "";
        }

        if (!title) {
            return <AnimatedHighlightedText text={highlightedText} />;
        }

        const parts = title.split(highlightedText);

        if (parts.length === 1) {
            return (
                <>
                    <span className={styles.secondaryText}>{title}</span>
                    <AnimatedHighlightedText text={highlightedText} />
                </>
            );
        }

        return (
            <>
                {parts.map((part, index) =>
                    <Fragment key={index}>
                        {part && <span className={styles.secondaryText}>{part}</span>}
                        {index < parts.length - 1 &&
                            <AnimatedHighlightedText text={highlightedText} />
                        }
                    </Fragment>
                )}
            </>
        );
    }, [title, highlightedText]);

    return (
        <div className={`${styles.wrapper} ${className ?? ""}`}>
            <h3 className={styles.heading(primary)}>
                {formattedTitle}
            </h3>
            {description &&
                <p className={`${styles.description(primary, longDescription ? true : false)} ${descriptionClassName ?? ""}`}>
                    {description}
                </p>
            }
            {longDescription && <DelayedLongDescription key={longDescription} text={longDescription} />}
        </div>
    );
});

export default Heading;