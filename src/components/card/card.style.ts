const cardStyles = {
    card: (showCount = false) => `${showCount ? "p-[25px] lg:p-[30px]" : "px-5 pt-5 lg:px-[30px] lg:pt-[30px]"}
    rounded-[20px] flex flex-col gap-[15px] md:gap-5 lg:w-full w-[320px] h-full`,
    cardInner: (showCount = false) => `flex flex-col ${showCount ? "gap-[30px]" : "gap-[5px] md:gap-2.5"}`,
    logo: "h-[36px] w-[50px] md:h-[50px]",
    title: "text-lg lg:text-[28px] lg:leading-[34px] font-semibold pr-[25px]",
    imageWrapper: "flex items-center justify-center overflow-hidden",
    img: "w-full h-full",
    countWrapper: "bg-white/50 w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold",
    countInner: "flex flex-col gap-5",
    countText: "text-sm"
};

export default cardStyles;