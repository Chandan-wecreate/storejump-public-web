import ICardData from "@/types/ICardData";
import ICardSectionData from "@/types/ICardSectionData";
import IFaqProps from "@/components/faq/interfaces/IFaqProps";
import IHeroSectionProps from "@/components/heroSection/interfaces/IHeroSectionProps";
import IMetadata from "@/types/IMetadata";
import IScheduleDemoProps from "@/components/scheduleDemo/interfaces/IScheduleDemoProps";

export default interface IPlatformData {
    slug: string;
    metadata: IMetadata;
    heroSection: IHeroSectionProps;
    whyJumpStore: ICardSectionData;
    anotherSalesChannel: ICardData;
    getStarted: ICardSectionData;
    faq: IFaqProps;
    scheduleDemo: IScheduleDemoProps;
}