import { memo } from "react";

import ITextFieldProps from "@/components/textField/interfaces/ITextFieldProps";

import styles from "@/components/textField/textField.styles";

const TextField = memo((props: ITextFieldProps) => {
    const { renderPrefix, renderSuffix, className, primary, ...otherProps } = props;

    return (
        <div className={`${styles.positionRelative} ${className}`}>
            {renderPrefix}
            <input {...otherProps} className={styles.input(primary)} />
            {renderSuffix}
        </div>
    );
});

export default TextField;