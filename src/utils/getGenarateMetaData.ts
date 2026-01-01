import { ResolvingMetadata } from "next";

import GenerateMetaDataProps from "@/types/generateMetaDataProps";
import IHeadProps from "@/types/IHeadProps";

const getGenarateMetaData = <T extends IHeadProps>(getData: (params: GenerateMetaDataProps["params"]) => Promise<T | undefined>) =>
    async function generateMetadata(props: GenerateMetaDataProps, parent: ResolvingMetadata) {
        const data = await getData(props.params);
        const parentData = await parent;
        const parentOGImage = parentData.openGraph?.images?.[0] as { url: string };

        if (data) {
            return {
                ...props,
                ...parentData,
                ...data.metadata,
                openGraph: {
                    title: data.metadata?.title,
                    description: data.metadata?.description,
                    images: [
                        {
                            url: data.metadata?.shareImage?.url
                                ? data.metadata.shareImage?.url
                                : parentOGImage?.url,
                            height: 600,
                            width: 1200,
                        }
                    ],
                }
            };
        }
    };

export default getGenarateMetaData;