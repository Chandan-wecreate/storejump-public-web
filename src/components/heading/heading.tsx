import { Fragment, memo, useMemo } from "react";

import IHeadingProps from "@/components/heading/interfaces/IHeadingProps";

import styles from "@/components/heading/heading.styles";

const Heading = memo((props: IHeadingProps) => {
    const { highlightedText, title, primary, className, description, descriptionClassName, longDescription } = props;

    const formattedTitle = useMemo(() => {
        if (!highlightedText) {
            return title || "";
        }

        if (!title) {
            return <span className={styles.gradientText}>{highlightedText}</span>;
        }

        const parts = title.split(highlightedText);

        if (parts.length === 1) {
            return (
                <>
                    <span className={styles.secondaryText}>{title}</span>
                    <span className={styles.gradientText}>{highlightedText}</span>
                </>
            );
        }

        return (
            <>
                {parts.map((part, index) =>
                    <Fragment key={index}>
                        {part && <span className={styles.secondaryText}>{part}</span>}
                        {index < parts.length - 1 &&
                            <span className={styles.gradientText}>{highlightedText}</span>
                        }
                    </Fragment>
                )}
            </>
        );
    }, [title, highlightedText]);

    return (
        <div className={`${styles.wrapper} ${className ?? ""}`}>
            <h3 className={styles.heading(primary)}>
                {formattedTitle}
            </h3>
            {description &&
                <p className={`${styles.description(primary, longDescription ? true : false)} ${descriptionClassName ?? ""}`}>
                    {description}
                </p>
            }
            {longDescription &&
                <p className={styles.description(false, false)}>
                    {longDescription}
                </p>
            }
        </div>
    );
});

export default Heading;