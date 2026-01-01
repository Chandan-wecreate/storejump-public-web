const pricingCardStyles = {
    pricingCardWrapper: "grid grid-cols-3 gap-[30px]",
    card: (isActive = false) => `${isActive ? "bg-themePrimary text-white" : "bg-white border border-paleSnow"}
    w-[80vw] lg:w-auto cursor-pointer flex flex-col p-[30px] lg:p-[35px]
    shadow-[0px_5px_30px_0px_color=var(--navyBlueLight)] rounded-3xl gap-5 lg:gap-9 h-full`,
    cardInner: "flex flex-col gap-[30px] lg:gap-[52px]",
    title: "text-[32px] font-semibold",
    commonText: (isActive = false) => `${isActive ? "text-white" : "text-grey"} font-medium`,
    price: "text-[64px]",
    time: "text-base text-blueHaze",
    divider: (isActive = false) => `${isActive ? "bg-blueHaze" : "bg-royalPastelBlue"} h-px w-full`,
    infoWrapper: "flex flex-col lg:gap-5",
    featuresWrapper: "flex flex-col gap-5 lg:gap-9",
    featuresInner: "flex flex-col gap-[30px]",
    feature: (isActive = false) => `${isActive ? "text-white" : "text-grey"} flex items-center gap-2.5`,
    scheduleDemoWrapper: "pb-[60px]",
    percentage: "text-themePrimary font-semibold",
    carouselWrapper: "mr-[-30px] lg:mr-0",
    cardInfo: "flex flex-col gap-5"
};

export default pricingCardStyles;