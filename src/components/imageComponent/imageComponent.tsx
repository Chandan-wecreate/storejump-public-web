"use client";
import { memo } from "react";
import Image from "next/image";

import IImageComponentProps from "@/components/imageComponent/interfaces/IImageComponentProps";
import useBaseUrl from "@/hooks/useBaseUrl";

const ImageComponent = memo((props: IImageComponentProps) => {
    const baseUrl = useBaseUrl(props.url);

    return (
        <Image
            className={props.className}
            src={props.staticImage ? props.url : baseUrl}
            alt={props.alternativeText}
            width={props.width}
            height={props.height}
            loading="eager"
        />
    );
});

export default ImageComponent;