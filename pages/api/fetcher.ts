import tmdb from "./axios";
import internalApi from "./internalAxios";

export const fetcher = async <T = any>(
    url: string,
    config?: {
        params?: Record<string, any>;
        method?: "get" | "post" | "put" | "delete" | "patch";
        data?: any;
        headers?: Record<string, any>;
    }
): Promise<T> => {
    try {
        const isInternalApi = url.startsWith("/api/");

        const axiosInstance = isInternalApi ? internalApi : tmdb;

        const method = config?.method || "get";

        const response = await axiosInstance.request<T>({
            url,
            method,
            params: config?.params,
            data: config?.data,
            headers: config?.headers,
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
