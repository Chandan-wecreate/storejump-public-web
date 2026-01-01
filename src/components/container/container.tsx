import { memo, PropsWithChildren } from "react";

import styles from "@/components/container/container.styles";

const Container = memo((props: PropsWithChildren) =>
    <div className={styles.container}>
        {props.children}
    </div>
);

export default Container;