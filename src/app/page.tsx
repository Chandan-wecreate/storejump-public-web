import ECommercePlatforms from "@/components/eCommercePlatforms/eCommrcePlatforms";
import HeroSection from "@/components/heroSection/heroSection";
import HowItWorks from "@/components/howItWorks/howItWorks";
import IHomeData from "@/types/IHomeData";
import PopulateTree from "@/types/PopulateTree";
import RequestUtils from "@/utils/requestUtils";
import ScheduleDemo from "@/components/scheduleDemo/scheduleDemo";
import WhatIsStoreJump from "@/components/whatIsStoreJump/whatIsStoreJump";

import styles from "@/app/home.styles";

const singleType = "home";

const keywords: PopulateTree = {
  metadata: "shareImage",
  heroSection: {
    platforms: "*",
    heroImg: "*",
    heading: "*",
  },
  whatIsJumpStore: {
    cardSection: {
      heading: "*",
      card: "*"
    }
  },
  scheduleDemo: {
    heading: "*",
  },
  howItWorks: {
    cardSection: {
      heading: "*",
      card: "*"
    }
  },
  eCommercePlatform: {
    cardSection: {
      heading: "*",
      card: "*"
    }
  },
  aiPoweredScheduleDemo: {
    heading: "*",
  },
};

const getData = async (): Promise<IHomeData> => {
  const homeData = await RequestUtils.request<IHomeData>(singleType, keywords);

  return homeData as IHomeData;
};

export default async function Home() {
  const data = await getData();

  return (
    <>
      <HeroSection {...data.heroSection} />
      <div className={styles.innerSection}>
        {data.whatIsJumpStore && <WhatIsStoreJump {...data.whatIsJumpStore} />}
        {data.scheduleDemo && <ScheduleDemo {...data.scheduleDemo} fullWidth />}
        {data.howItWorks && <HowItWorks {...data.howItWorks} />}
        {data.eCommercePlatform && <ECommercePlatforms {...data.eCommercePlatform} />}
        {data.aiPoweredScheduleDemo && <ScheduleDemo {...data.aiPoweredScheduleDemo} />}
      </div>
    </>
  );
}
