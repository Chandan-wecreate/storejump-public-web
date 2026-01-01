const mobileContainer = "grid gap-y-8 grid-rows-[repeat(var(--cards-count),_var(--card-height))]";

const sticky = "card-wrapper origin-top sticky top-[120px] md:top-0 md:relative";

const cardRootClass = "!h-[--card-height]";

const cardClass = "card-img";

const cardStackStyles = {
    mobileContainer,
    sticky,
    cardRootClass,
    cardClass,
};

export default cardStackStyles;