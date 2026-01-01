const textFieldStyles = {
    positionRelative: "relative",
    input: (primary = false) => `${primary ? "bg-white text-themeBlack" : "border-quickSilver border-2 text-white"} w-full rounded-full h-[45px] md:h-[50px] lg:h-[60px] pl-5`,
};

export default textFieldStyles;