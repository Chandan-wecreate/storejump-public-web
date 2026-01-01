import { memo, useEffect, useRef, useState } from "react";

import IImageData from "@/types/IImageData";
import ImageComponent from "@/components/imageComponent/imageComponent";
import useBreakpoints from "@/hooks/useBreakpoints";

import styles from "@/components/imageTicker/imageTicker.styles";

type ImageTickerProps = { images: IImageData[] };

const mobileContainer = 1.3;
const desktopContainer = 1.5;
const animationSpeedCap = 10;
const animationMinSpeedCap = 30;
const animationMaxSpeedCap = 20;

const ImageTicker = memo((props: ImageTickerProps) => {
    const breakpoints = useBreakpoints();
    const containerRef = useRef<HTMLDivElement>(null);
    const originalTrackRef = useRef<HTMLDivElement>(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [animationSpeed, setAnimationSpeed] = useState("15s");

    useEffect(() => {
        const checkOverflow = () => {
            if (!originalTrackRef.current || !containerRef.current) return;

            const originalTrack = originalTrackRef.current;
            const container = containerRef.current;
            const originalTrackWidth = originalTrack.scrollWidth;
            const containerWidth = container.clientWidth;
            const isOverflowing = originalTrackWidth > containerWidth;
            let needsAnimation = false;

            if (breakpoints.LG) {
                needsAnimation = isOverflowing;
            } else if (breakpoints.MD) {
                needsAnimation = originalTrackWidth > containerWidth * mobileContainer;
            } else {
                needsAnimation = originalTrackWidth > containerWidth * desktopContainer;
            }

            setShouldAnimate(needsAnimation);

            if (needsAnimation) {
                const overflowRatio = originalTrackWidth / containerWidth;
                const speed =
                    Math.max(animationSpeedCap, Math.min(animationMinSpeedCap, animationMaxSpeedCap / overflowRatio));
                setAnimationSpeed(`${speed}s`);
            }
        };
        checkOverflow();
        const handleResize = () => {
            checkOverflow();
        };

        window.addEventListener("resize", handleResize);
        const resizeObserver = new ResizeObserver(checkOverflow);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            resizeObserver.disconnect();
        };
    }, [breakpoints.LG, breakpoints.MD, props.images]);

    if (!props.images?.length) return null;

    return (
        <div ref={containerRef} className={styles.slider}>
            <div ref={originalTrackRef} className={styles.track}>
                {props.images.map((item, index) =>
                    <div key={index} className={styles.tickerImage}>
                        <ImageComponent {...item} />
                    </div>
                )}
            </div>
            <div
                className={styles.sliderTrack(shouldAnimate)}
                style={shouldAnimate ? {
                    animation: `scroll ${animationSpeed} linear infinite`,
                    width: "max-content"
                } : {}}
            >
                {props.images.map((item, index) =>
                    <ImageComponent
                        {...item}
                        className={styles.tickerImage}
                        key={`img-${index}`}
                    />
                )}

                {shouldAnimate && props.images.map((item, index) =>
                    <ImageComponent
                        {...item}
                        className={styles.tickerImage}
                        key={`clone-${index}`}
                        aria-hidden="true"
                    />
                )}
            </div>
        </div>
    );
});

export default ImageTicker;