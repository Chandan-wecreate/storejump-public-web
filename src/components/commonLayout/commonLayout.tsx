import { memo } from "react";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

import styles from "@/components/commonLayout/commonLayout.styles";

const CommonLayout = memo((props: React.PropsWithChildren) =>
    <div className={styles.wrapper}>
        <div className={styles.inner}>
            <div className={styles.topGradient}></div>
            <div className={styles.bottomGradient}></div>
            <Header />
            {props.children}
        </div>
        <Footer />
    </div>
);

export default CommonLayout;