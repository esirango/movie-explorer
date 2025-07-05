import tmdb from "./axios";

export const fetcher = async <T = any>(
    url: string,
    config?: {
        params?: Record<string, any>;
        method?: "get" | "post" | "put" | "delete";
        data?: any;
    }
): Promise<T> => {
    try {
        const method = config?.method || "get";
        const response = await tmdb.request<T>({
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
