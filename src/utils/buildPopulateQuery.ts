import PopulateTree from "@/types/PopulateTree";

export default function buildPopulateQuery(
    obj: PopulateTree,
    prefix = "populate"
): string {
    const parts: string[] = [];

    for (const [key, value] of Object.entries(obj)) {
        if (value === true) {
            // root-level populate (e.g. populate=favicons)
            parts.push(`${prefix}=${key}`);
        } else if (typeof value === "string") {
            parts.push(`${prefix}[${key}][populate]=${value}`);
        } else if (Array.isArray(value)) {
            for (const item of value) {
                if (typeof item === "string") {
                    parts.push(`${prefix}[${key}][populate]=${item}`);
                } else {
                    parts.push(buildPopulateQuery(item, `${prefix}[${key}][populate]`));
                }
            }
        } else if (typeof value === "object") {
            parts.push(buildPopulateQuery(value, `${prefix}[${key}][populate]`));
        }
    }

    return parts.join("&");
}