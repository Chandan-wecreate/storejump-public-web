"use client";

import { useCallback, useState } from "react";

import ISwitchFieldProps from "@/components/switchField/interfaces/ISwitchFieldProps";

import styles from "@/components/switchField/ISwitchField.styles";

export default function SwitchField({
    defaultChecked = false,
    onChange,
    label,
    afterLabel,
    disabled = false
}: ISwitchFieldProps) {
    const [checked, setChecked] = useState(defaultChecked);

    const handleToggle = useCallback(() => {
        if (disabled) return;
        const newChecked = !checked;
        setChecked(newChecked);
        onChange?.(newChecked);
    }, [checked, disabled, onChange]);

    return (
        <div className={styles.wrapper}>
            {label &&
                <span className={styles.label(disabled)}>
                    {label}
                </span>
            }
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                disabled={disabled}
                onClick={handleToggle}
                className={styles.button(checked, disabled)}
            >
                <span className={styles.icon(checked)} />
            </button>
            {afterLabel &&
                <span className={styles.label(disabled)}>
                    {afterLabel}
                </span>
            }
        </div>
    );
}