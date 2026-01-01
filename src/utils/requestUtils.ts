import apiUrls from "@/constants/apiUrls";
import buildFilterQuery from "@/utils/buildFilterQuery";
import buildPopulateQuery from "@/utils/buildPopulateQuery";
import IData from "@/types/IData";
import IFilterTree from "@/types/IFilterTree";
import PopulateTree from "@/types/PopulateTree";

type RequestReturn<T> = IData<T>;

export default class RequestUtils {
    static baseHeaders: HeadersInit = { "Content-Type": "application/json" };

    static async request<T>(
        singleType: string,
        paramsObj?: PopulateTree,
        filters?: IFilterTree,
        isCollection?: boolean
    ): Promise<T | undefined> {
        try {
            const queryParams = paramsObj ? buildPopulateQuery(paramsObj) : "";
            const queryFilters = filters ? buildFilterQuery(filters) : "";

            const response = await fetch(`${apiUrls.STRAPI_URL}/api/${singleType}?${queryFilters}&${queryParams}`, {
                headers: {
                    Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
                }
            });

            const result: RequestReturn<T> = await response.json();

            if (result.error) {
                throw new Error(result.error.message);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status} -> ${response.statusText}`);
            }

            return isCollection ? (result.data as T) : result.data;
        } catch (error) {
            const errorMessage = typeof error === "string" ? error : (error as Error).message;
            return { error: errorMessage } as unknown as T;
        }
    }
}