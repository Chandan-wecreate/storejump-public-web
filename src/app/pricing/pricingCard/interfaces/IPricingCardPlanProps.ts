import IPricingCardFeatureProps from "@/app/pricing/pricingCard/interfaces/IPricingCardFeatureProps";

export default interface IPricingCardPlanProps {
    title: string;
    description: string;
    savePercentage: string;
    monthlyAmount: string;
    yearlyAmount: string;
    features: IPricingCardFeatureProps[];
}