import ICardData from "@/types/ICardData";
import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";

export default interface ICardSectionData {
    cardSection: {
        heading: IHeadingProps;
        card: ICardData[];
    };
}