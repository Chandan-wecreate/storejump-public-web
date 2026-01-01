import { memo } from "react";

import IThemeButtonProps from "@/components/themeButton/interfaces/IThemeButtonProps";
import PaddingVariants from "@/components/themeButton/enums/paddingVariants";

import styles from "@/components/themeButton/themeButton.styles";

const ThemeButton = memo((props: IThemeButtonProps) => {
    const { spacing = PaddingVariants.Default, primary, title, className, secondary, type } = props;

    return (
        <button className={`${styles.button(primary, secondary, spacing)} ${className}`} type={type || "button"}>
            {title}
        </button>
    );
});

export default ThemeButton;