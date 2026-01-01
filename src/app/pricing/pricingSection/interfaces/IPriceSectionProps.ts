import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";
import IPricingCardPlanProps from "@/app/pricing/pricingCard/interfaces/IPricingCardPlanProps";

export default interface IPriceSectionProps {
    heading: IHeadingProps;
    pricing: IPricingCardPlanProps[];
}