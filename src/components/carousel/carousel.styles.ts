const carouselStyles = {
    carousel: "flex gap-[30px] transition-transform duration-300 ease-in-out cursor-grab",
    carouselItem: (isLast = false) => `${isLast ? "pr-[30px]" : ""} select-none transition-transform duration-300 ease-in-out`,
    mobileWrapper: "relative overflow-hidden w-full select-none",
    carouselWrapper: "flex flex-col gap-5",
    arrowWrapper: "flex gap-5",
    arrowButton: (isDisabled = false) => `select-none w-[34px] h-[34px] lg:w-[45px] lg:h-[45px] 
    bg-azureishWhite rounded-full flex items-center justify-center group hover:bg-themePrimary
     cursor-pointer${isDisabled ? " opacity-50 pointer-events-none" : ""}`,
    arrowButtonIcon: "w-[13px] h-[15px] lg:w-5 lg:h-5 group-hover:invert",
    arrowButtonIconRight: "rotate-180"
};

export default carouselStyles;