const whatIsStoreJumpStyles = {
    wrapper: "py-[30px] md:py-10 grid lg:grid-cols-3 grid-rows-3 lg:grid-rows-none gap-5 md:gap-[30px]",
    leftCol: "flex flex-col gap-2.5",
    leftColInner: "flex flex-col gap-2.5",

    // Entrance animation (section left column)
    animationBase:
        "transform-gpu will-change-transform transition-[opacity,transform] duration-600 ease-out motion-reduce:transition-none motion-reduce:transform-none",
    animationHiddenLeft: "opacity-0 -translate-x-4 motion-reduce:opacity-100",
    animationVisible: "opacity-100 translate-x-0",
};

export default whatIsStoreJumpStyles;