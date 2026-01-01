import Container from "@/components/container/container";
import Faq from "@/components/faq/faq";
import getGenarateMetaData from "@/utils/getGenarateMetaData";
import IPricingData from "@/types/IPricingData";
import PopulateTree from "@/types/PopulateTree";
import PricingSection from "@/app/pricing/pricingSection/pricingSection";
import RequestUtils from "@/utils/requestUtils";
import ScheduleDemo from "@/components/scheduleDemo/scheduleDemo";

import styles from "@/app/pricing/pricing.styles";

const singleType = "pricing";

const keywords: PopulateTree = {
    metadata: "shareImage",
    pricingSection: {
        heading: "*",
        pricing: "*"
    },
    faq: {
        heading: "*",
        faqQuestions: "*"
    },
    scheduleDemo: {
        heading: "*",
    },
};

const getData = async (): Promise<IPricingData> => {
    const homeData = await RequestUtils.request<IPricingData>(singleType, keywords);

    return homeData as IPricingData;
};

export default async function Pricing() {
    const data = await getData();

    return (
        <div className={styles.postionRelative}>
            <Container>
                {data.pricingSection && <PricingSection {...data.pricingSection} />}
                {data.faq && <Faq {...data.faq} />}
            </Container>
            {
                data.scheduleDemo &&
                <div className={styles.scheduleDemoWrapper}>
                    <ScheduleDemo {...data.scheduleDemo} />
                </div>
            }
        </div>
    );
}

export const generateMetadata = getGenarateMetaData(getData);