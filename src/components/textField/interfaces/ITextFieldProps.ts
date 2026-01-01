import { InputHTMLAttributes, ReactNode } from "react";

export default interface ITextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    renderPrefix?: ReactNode;
    renderSuffix?: ReactNode;
    className?: string;
    primary?: boolean;
}