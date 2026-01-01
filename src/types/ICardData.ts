import IImageData from "@/types/IImageData";

export default interface ICardData {
    title: string;
    highlightedText?: string;
    description: string;
    longDescription?: string;
    cardBackgroundColor: string;
    logo: IImageData;
    img: IImageData;
    showCount?: boolean;
    id?: number;
}