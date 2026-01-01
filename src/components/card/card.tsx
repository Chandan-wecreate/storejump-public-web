import { memo } from "react";

import ICardData from "@/types/ICardData";
import ImageComponent from "@/components/imageComponent/imageComponent";

import styles from "@/components/card/card.style";

const Card = memo((props: ICardData) =>
    <div
        className={styles.card(props.showCount)}
        style={{ backgroundColor: `${props.cardBackgroundColor}` }}
    >
        <div className={styles.cardInner(props.showCount)}>
            {props.logo && <ImageComponent {...props.logo} className={styles.logo} />}
            {props.showCount && <div className={styles.countWrapper}>{props.id}</div>}
            <div className={styles.countInner}>
                <h2 className={styles.title}>{props.title}</h2>
                {props.description && <p className={styles.countText}>{props.description}</p>}
            </div>
        </div>
        <div className={styles.imageWrapper}>
            <ImageComponent {...props.img} className={styles.img} />
        </div>
    </div>
);

export default Card;