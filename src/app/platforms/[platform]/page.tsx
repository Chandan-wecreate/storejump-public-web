import Container from "@/components/container/container";
import Faq from "@/components/faq/faq";
import GenerateMetaDataProps from "@/types/generateMetaDataProps";
import getGenarateMetaData from "@/utils/getGenarateMetaData";
import GetStartedSection from "@/app/platforms/[platform]/getStartedSection/getStartedSection";
import HeroSection from "@/components/heroSection/heroSection";
import IPlatformData from "@/types/IPlatformData";
import PopulateTree from "@/types/PopulateTree";
import RequestUtils from "@/utils/requestUtils";
import SalesChannelSection from "@/app/platforms/[platform]/salesChannelSection/salesChannelSection";
import ScheduleDemo from "@/components/scheduleDemo/scheduleDemo";
import WhyJumpStoreSection from "@/app/platforms/[platform]/whyJumpStoreSection/whyJumpStoreSection";

import styles from "@/app/platforms/[platform]/platform.styles";

const keywords: PopulateTree = {
    metadata: "shareImage",
    heroSection: {
        platforms: "*",
        heroImg: "*",
        heading: "*",
        features: "*"
    },
    whyJumpStore: {
        cardSection: {
            heading: "*",
            card: "*"
        }
    },
    anotherSalesChannel: "*",
    getStarted: {
        cardSection: {
            heading: "*",
            card: "*"
        }
    },
    faq: {
        heading: "*",
        faqQuestions: "*"
    },
    scheduleDemo: "*"
};

const getData = async (params: GenerateMetaDataProps["params"]): Promise<IPlatformData> => {
    const platformData = await RequestUtils.request<IPlatformData[]>("platforms", keywords, { slug: { $eq: params.platform } });

    return platformData?.[0] as IPlatformData;
};

export default async function Platform(props: GenerateMetaDataProps) {
    const data = await getData(props.params);

    return (
        <div className={styles.wrapper}>
            {data.heroSection && <HeroSection {...data.heroSection} hideImgOnMobile />}
            {data.whyJumpStore && <WhyJumpStoreSection {...data.whyJumpStore} />}
            {data.anotherSalesChannel && <SalesChannelSection {...data.anotherSalesChannel} />}
            {data.getStarted && <GetStartedSection {...data.getStarted} />}
            {data.faq && <Container><Faq {...data.faq} /></Container>}
            {data.scheduleDemo && <ScheduleDemo {...data.scheduleDemo} />}
        </div>
    );
}

export const generateStaticParams = async () => {
    const data = await RequestUtils.request<IPlatformData[]>("platforms", undefined, undefined, true);

    return data
        ? data.map((platform) => ({ platform: platform.slug }))
        : [];
};

export const generateMetadata = getGenarateMetaData(getData);