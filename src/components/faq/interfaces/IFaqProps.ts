import IFaqQuestionData from "@/components/faq/interfaces/IFaqQuestionData";
import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";

export default interface IFaqProps {
    heading: IHeadingProps;
    faqQuestions: IFaqQuestionData;
}