const accordionStyles = {
    wrapper: "flex flex-col gap-5 lg:gap-10",
    main: "bg-alpineWhite px-5 py-[15px] lg:p-[30px] rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer group flex flex-col",
    titleWrapper: "flex items-start justify-between",
    title: "lg:text-[30px]! text-base [&>h3]:lg:text-[30px]! [&>h3]:text-base! [&>h3]:leading-[22px]! font-bold text-gray-900",
    iconShrink: "shrink-0",
    iconSize: "relative w-10 h-10",
    iconInner: "absolute inset-0 flex items-center justify-center",
    iconInnerSize: "relative w-5 h-5",
    horizontalLine: (isActive = false) => `absolute top-1/2 left-0 h-0.5 bg-gray-700 transform -translate-y-1/2
    transition-all duration-150 ease-in-out will-change-transform ${isActive ? "w-4 left-0.5" : "w-5"}`,
    verticalLine: (isActive = false) => `absolute left-1/2 top-0 h-5 w-0.5 bg-gray-700 transform -translate-x-1/2
    transition-all duration-150 ease-in-out
    will-change-transform ${isActive ? "rotate-90 scale-y-0" : "rotate-0 scale-y-100"}`,
    descriptionWrapper: (isActive = false) => `grid transition-[grid-template-rows] duration-200 ease-in-out
    will-change-transform ${isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`,
    descriptionInner: "overflow-hidden min-h-0",
    description: (isActive = false) => `text-gray-600 text-sm lg:text-lg leading-relaxed transition-opacity
    duration-200 ease-in-out will-change-opacity ${isActive ? "opacity-100 delay-75" : "opacity-0"} pt-[15px]`
};

export default accordionStyles;