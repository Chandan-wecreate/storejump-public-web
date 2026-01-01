import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";
import IImageData from "@/types/IImageData";

export default interface IHeroSectionProps {
    heading?: IHeadingProps;
    platforms?: { images: IImageData[] };
    heroImg?: IImageData;
    hideImgOnMobile?: boolean;
    buttonText?: string;
    features: {
        feature: string;
    }[];
}