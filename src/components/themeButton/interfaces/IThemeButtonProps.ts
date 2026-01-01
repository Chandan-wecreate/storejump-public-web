import { ButtonHTMLAttributes } from "react";

import PaddingVariants from "@/components/themeButton/enums/paddingVariants";

export default interface IThemeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    primary?: boolean;
    secondary?: boolean;
    spacing?: PaddingVariants;
    className?: string;
}