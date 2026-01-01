const switchFieldStyles = {
    wrapper: "flex items-center gap-3",
    label: (disabled = false) => `text-lg font-semibold ${disabled ? "text-gray-500" : "text-gray-700"}`,
    button: (checked = false, disabled = false) => `relative inline-flex h-6 w-11 items-center
    rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-lighBlue"}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`,
    icon: (checked = false) => `inline-block h-4 w-4 transform rounded-full bg-white transition-transform
    ${checked ? "translate-x-6" : "translate-x-1"}`
};

export default switchFieldStyles;