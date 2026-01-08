export default interface IHeadingProps {
    /** 
     * Determines if this is the primary heading variant.
     * Affects the visual styling of the heading.
     */
    primary?: boolean;

    /** 
     * Text to be displayed with gradient styling.
     * This text appears first and is visually emphasized.
     */
    highlightedText?: string;

    /** 
     * Regular text to follow the highlighted text.
     * This appears after the highlighted text with secondary styling.
     */
    title?: string;

    /** 
     * Additional CSS classes to apply to the container div.
     * Useful for custom styling, margins, or layout adjustments.
     */
    className?: string;

    /** 
     * Optional description text to display below the heading.
     * Note: Currently not rendered in the component - reserved for future use.
     */
    description?: string;
    descriptionClassName?: string;
    longDescription?: string;
    noTransition?: boolean;
}