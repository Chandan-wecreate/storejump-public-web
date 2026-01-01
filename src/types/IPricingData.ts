import IFaqProps from "@/components/faq/interfaces/IFaqProps";
import IHeadProps from "@/types/IHeadProps";
import IPriceSectionProps from "@/app/pricing/pricingSection/interfaces/IPriceSectionProps";
import IScheduleDemoProps from "@/components/scheduleDemo/interfaces/IScheduleDemoProps";

export default interface IPricingData extends IHeadProps {
    pricingSection: IPriceSectionProps;
    faq: IFaqProps;
    scheduleDemo: IScheduleDemoProps;
}