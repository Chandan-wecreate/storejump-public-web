import { memo } from "react";
import Link from "next/link";

import IFooterColumnProps from "@/components/footer/footerColumn/interfaces/IFooterColumnProps";

import commonStyles from "@/common/common.styles";
import styles from "@/components/footer/footerColumn/footerColumn.styles";

const FooterColumn = memo((props: IFooterColumnProps) =>
    <>
        <span className={styles.wrapper}>{props.title}</span>
        <div className={styles.linkWrapper}>
            {props.links.map((product, index) =>
                <Link className={commonStyles.link()} key={index} href={product.href}>
                    {product.title}
                </Link>
            )}
        </div>
    </>
);

export default FooterColumn;