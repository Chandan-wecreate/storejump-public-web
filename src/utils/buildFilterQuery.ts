import IFilterTree from "@/types/IFilterTree";

export default function buildFilterQuery(
    obj: IFilterTree,
    prefix: string = "filters"
): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
        if (value === undefined) continue;

        if (Array.isArray(value)) {
            value.forEach((val, index) => {
                const safeVal = val === null ? "null" : encodeURIComponent(String(val));
                parts.push(`${prefix}[${key}][${index}]=${safeVal}`);
            });
        } else if (value !== null && typeof value === "object") {
            parts.push(buildFilterQuery(value as IFilterTree, `${prefix}[${key}]`));
        } else {
            const safeVal = value === null ? "null" : encodeURIComponent(String(value));
            parts.push(`${prefix}[${key}]=${safeVal}`);
        }
    }

    return parts.join("&");
}