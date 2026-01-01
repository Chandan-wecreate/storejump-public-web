import IPricingCardPlanProps from "@/app/pricing/pricingCard/interfaces/IPricingCardPlanProps";

export default interface IPricingCardProps {
    plans: IPricingCardPlanProps[];
    isMonthly: boolean;
}