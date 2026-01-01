const scheduleDemoStyles = {
    containerBg: "bg-seashellBlue",
    wrapper: (fullWidth = false) => `flex-col lg:flex-row flex-wrap 
    ${fullWidth ? "py-20" : "p-[25px] lg:pl-[66px] lg:pr-[44px] lg:py-[60px]"} rounded-[20px]
    ${!fullWidth ? "custom-bg-gradient" : ""}  flex justify-center gap-5 md:gap-[30px]`,
    flexCenter: "flex flex-col justify-center",
    description: "text-gray-700",
    textField: "w-full md:[&>input]:h-[70px]",
    buttonWrapper: "hidden md:flex absolute top-2.5 right-2.5",
    textfieldWrapper: "w-full flex flex-col gap-[15px] justify-center items-center",
    button: "w-full max-w-full flex justify-center",
    flex1: "flex-1",
    animationBase: "will-change-transform transition-[opacity,transform,translate] duration-700 ease-out",
    animationLeftHidden: "opacity-0 -translate-x-10",
    animationRightHidden: "opacity-0 translate-x-10",
    animationVisible: "opacity-100 translate-x-0",
};

export default scheduleDemoStyles;