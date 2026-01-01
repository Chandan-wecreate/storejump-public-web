export default interface ISwitchFieldProps {
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    label?: string;
    afterLabel?: string;
    disabled?: boolean;
}