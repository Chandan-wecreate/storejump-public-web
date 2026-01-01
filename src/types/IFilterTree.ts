type FilterOperator =
    | "$eq" | "$eqi" | "$ne" | "$nei" | "$lt" | "$lte" | "$gt" | "$gte"
    | "$in" | "$notIn" | "$contains" | "$notContains" | "$containsi"
    | "$null" | "$notNull" | "$between" | "$startsWith" | "$endsWith"
    | "$or" | "$and" | "$not";

type Primitive = string | number | boolean | null;

export default interface IFilterTree {
    [key: string]:
    | Primitive
    | Primitive[]
    | { [K in FilterOperator]?: Primitive | Primitive[] | IFilterTree }
    | IFilterTree;
}