const imageTickerStyles = {
    slider: "relative overflow-hidden w-full css-ticker select-none",
    sliderTrack: (shouldAnimate = false) => `flex items-center justify-center xl:justify-start 
    ${shouldAnimate ? "w-full animate-none" : ""}`,
    tickerImage: "w-auto max-w-[120px] h-auto flex-none mx-4 self-center object-contain flex-shrink-0",
    track: "absolute invisible flex w-max",
};

export default imageTickerStyles;