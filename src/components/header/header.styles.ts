const baseHamburgerLine = "block h-[2px] bg-gray-800 rounded-full transition-all duration-300 origin-center";

const headerStyles = {
    header: "flex items-center justify-between py-[30px]",
    menuWrapper: "gap-10 lg:flex hidden",
    sticky: (scrolled = false) => `${scrolled ? "bg-white" : ""} sticky top-0 z-100`,
    menuItemAnimationBase: "inline-block will-change-transform transition-[opacity,transform,translate] duration-500 ease-out",
    menuItemHidden: "opacity-0 -translate-y-2",
    menuItemPreVisible: "opacity-0 -translate-y-6",
    menuItemVisible: "opacity-100 translate-y-0",
    hamburger: "group flex flex-col justify-center space-y-1 relative z-20 lg:hidden",
    hamburgerLine1: `${baseHamburgerLine} w-5 group-[.is-active]:translate-y-[6px] group-[.is-active]:rotate-45`,
    hamburgerLine2: `${baseHamburgerLine} w-5 group-[.is-active]:opacity-0`,
    hamburgerLine3: `${baseHamburgerLine} w-5 group-[.is-active]:-translate-y-[6px] group-[.is-active]:-rotate-45`,
    hamburgerline2Inner: "absolute right-0 top-0 h-full bg-gray-800 rounded-full scale-x-150",
    mobileMenu: (isActive = false) => `bg-white! fixed ${isActive ? "left-0" : "left-full"} top-0 w-full h-dvh p-[30px] transition-all duration-500 z-10`,
    mobileMenuItemWrapper: "flex flex-col pt-[60px] gap-5",
    logo: "lg:w-[200px] lg:h-12 w-[138px] h-8 relative z-20",
};

export default headerStyles;