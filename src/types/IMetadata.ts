import { Metadata } from "next";

import IImageData from "@/types/IImageData";

export default interface IMetadata extends Omit<Metadata, "icons" | "openGraph"> {
    shareImage: IImageData;
}