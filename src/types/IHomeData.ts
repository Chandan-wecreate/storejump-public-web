import ICardSectionData from "@/types/ICardSectionData";
import IHeroSectionProps from "@/components/heroSection/interfaces/IHeroSectionProps";
import IMetadata from "@/types/IMetadata";
import IScheduleDemoProps from "@/components/scheduleDemo/interfaces/IScheduleDemoProps";

export default interface IHomeData {
    metaData: IMetadata;
    heroSection: IHeroSectionProps;
    whatIsJumpStore: ICardSectionData;
    scheduleDemo: IScheduleDemoProps;
    howItWorks: ICardSectionData;
    eCommercePlatform: ICardSectionData;
    aiPoweredScheduleDemo: IScheduleDemoProps;
}