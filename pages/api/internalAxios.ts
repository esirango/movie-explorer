import axios from "axios";
import Cookies from "js-cookie";

const INTERNAL_BASE_API_URL =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:4000";

const internalApi = axios.create({
    baseURL: INTERNAL_BASE_API_URL,
});

internalApi.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token) {
        (config.headers as any) = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

export default internalApi;
