const headingStyles = {
    heading: (primary = false) =>
        `${primary ? "lg:text-[56px] text-[30px] lg:leading-[60px]" : "lg:text-[34px] text-[24px]"} text-cosmos font-bold leading-tight`,
    gradientText: "bg-gradient-to-r from-themePrimary to-oceanGreen bg-clip-text text-transparent inline",
    gradientTextAnimated: "bg-gradient-to-r from-themePrimary to-oceanGreen  bg-clip-text text-transparent inline transition-[background-position] duration-700 ease-in-out",
    secondaryText: "text-cosmos inline",
    description: (primary = false, isSemiBold = false) => `${isSemiBold ? "font-semibold" : ""} ${primary ? "text-lg md:text-2xl" : "text-sm md:text-lg"}`,
    wrapper: "flex flex-col md:gap-[15px] gap-2.5",
    longDescriptionTransition: "overflow-hidden transition-[max-height,opacity] duration-700 ease-in-out"
};

export default headingStyles;