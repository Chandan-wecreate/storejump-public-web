import { memo } from "react";
import Link from "next/link";

import Container from "@/components/container/container";
import FooterColumn from "@/components/footer/footerColumn/footerColumn";
import ImageComponent from "@/components/imageComponent/imageComponent";

import styles from "@/components/footer/footer.styles";

type Links = { title: string; href: string }[];

const products: Links = [
    {
        title: "Platform Integrations",
        href: "/"
    },
    {
        title: "Pricing",
        href: "/"
    }
];

const company: Links = [
    {
        title: "About",
        href: "/"
    },
    {
        title: "Blog",
        href: "/"
    },
    {
        title: "Contact",
        href: "/"
    }
];

const Footer = memo(() =>
    <div className={styles.wrapper}>
        <Container>
            <div className={styles.scheduleWrapper}>
                <div className={styles.footer}>
                    <div className={styles.footerCol}>
                        <div className={styles.footerLeftCol}>
                            <div className={styles.logoWrapper}>
                                <ImageComponent
                                    url="/images/branding/logo_small.svg"
                                    alternativeText="store_jump"
                                    width={50}
                                    height={50}
                                    staticImage
                                />
                                <span className={styles.title}>StoreJump</span>
                            </div>
                            <span className={styles.description}>
                                AI-powered checkout for every platform — helping
                                shoppers find the perfect product instantly.
                            </span>
                        </div>
                        <div className={styles.footerRightCol}>
                            <div className={styles.footerRightColInner}>
                                <FooterColumn title="Product" links={products} />
                            </div>
                            <div className={`${styles.footerRightColInner} ${styles.justifyEnd}`}>
                                <FooterColumn title="Company" links={company} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.divider} />
                    <div className={styles.footerBottom}>
                        <span className={styles.textLg}>
                            © {new Date().getFullYear()} Tutkoo Inc. Copyright all reserved
                        </span>
                        <div className={styles.termsWrapper}>
                            <Link className={styles.textLg} href="/">Terms of Service</Link>
                            <span className={styles.textLgBold}>&#xB7;</span>
                            <Link className={styles.textLg} href="/">Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    </div>
);

export default Footer;