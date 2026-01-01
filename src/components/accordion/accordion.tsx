import { memo, useState } from "react";

import Heading from "@/components/heading/heading";
import IAccordionProps from "@/components/accordion/interfaces/IAccordionProps";

import styles from "@/components/accordion/accordion.styles";

const Accordion = memo((props: IAccordionProps) => {
    const [active, setActive] = useState(-1);

    return (
        <div className={styles.wrapper}>
            {props.accordions.map((accordion, index) =>
                <div
                    key={index}
                    className={styles.main}
                    onClick={() => setActive(active === index ? -1 : index)}
                >
                    <div className={styles.titleWrapper}>
                        {
                            active === index &&
                            <Heading
                                className={styles.title}
                                title={accordion.title}
                                highlightedText={accordion.title}
                            />
                        }
                        {
                            active !== index &&
                            <h2 className={styles.title}>
                                {accordion.title}
                            </h2>
                        }
                        <div className={styles.iconShrink}>
                            <div className={styles.iconSize}>
                                <div className={styles.iconInner}>
                                    <div className={styles.iconInnerSize}>
                                        <div className={styles.horizontalLine(active === index)} />
                                        <div className={styles.verticalLine(active === index)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.descriptionWrapper(active === index)}>
                        <div className={styles.descriptionInner}>
                            <p className={styles.description(active === index)}>
                                {accordion.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

export default Accordion;