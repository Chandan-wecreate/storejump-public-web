const heroSectionStyles = {
    wrapper: "grid auto-rows-auto xl:grid-cols-[1fr_1.1fr] items-center pb-10 gap-[30px] xl:gap-[130px]",
    heroSection: "grid auto-cols-auto gap-5 items-center lg:text-center text-left xl:justify-items-start xl:text-left",
    description: "text-lg",
    companiesWrapper: "flex items-center gap-5 flex-wrap justify-center xl:justify-start",
    heroImgWrapper: (hideOnMobile = false) => `${hideOnMobile ? "hidden lg:flex" : ""} flex justify-center xl:justify-end`,
    imageWrapper: "w-full h-full lg:w-[60%] xl:w-full",
    buttonWrapper: "flex items-center lg:justify-center",
    featureWrapper: "flex gap-[30px] lg:justify-center",
    feature: "flex items-center justify-center gap-2.5 text-xs lg:text-lg",
    featureImg: "lg:w-5 lg:h-5 w-[15px] h-[15px]",

    // Animations
    contentAnimationBase:
        "transform-gpu will-change-transform transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:transform-none",
    contentAnimationHidden: "opacity-0 -translate-x-6 motion-reduce:opacity-100",
    contentAnimationVisible: "opacity-100 translate-x-0",

    heroImageAnimationHidden: "opacity-0 translate-x-6 motion-reduce:opacity-100",
    heroImageAnimationVisible: "opacity-100 translate-x-0",
};

export default heroSectionStyles;