import tmdb from "./axios"; // axios instance با baseURL TMDB
import internalApi from "./internalAxios"; // axios instance با baseURL داخلی

export const fetcher = async <T = any>(
    url: string,
    config?: {
        params?: Record<string, any>;
        method?: "get" | "post" | "put" | "delete";
        data?: any;
    }
): Promise<T> => {
    try {
        // تشخیص API داخلی یا TMDB بر اساس url
        const isInternalApi = url.startsWith("/api/");

        const axiosInstance = isInternalApi ? internalApi : tmdb;

        const method = config?.method || "get";

        const response = await axiosInstance.request<T>({
            url,
            method,
            params: config?.params,
            data: config?.data,
        });

        return response.data;
    } catch (error: any) {
        console.error("❌ Global fetcher error:", {
            url,
            message: error.message,
        });

        throw error;
    }
};
