import IImageData from "@/types/IImageData";

export default interface IImageComponentProps extends IImageData {
    className?: string;
    staticImage?: boolean;
}