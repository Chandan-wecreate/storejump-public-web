const themeButtonStyles = {
    button: (primary = false, secondary = false, spacing: string) => `
    ${primary ? "bg-themePrimary text-white" : secondary ? "text-themePrimary bg-white border-themePrimary" : "text-themePrimary bg-white border"}
    text-base lg:text-lg cursor-pointer h-[45px] md:h-[50px] rounded-[40px] ${spacing} flex items-center
    font-medium max-w-fit`
};

export default themeButtonStyles;