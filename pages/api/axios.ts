import axios from "axios";
import Cookies from "js-cookie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_API_URL = process.env.TMDB_BASE_API_URL;

const getLocale = () => {
    if (typeof window !== "undefined") {
        const lang = Cookies.get("lang") || "en";
        return lang === "fa" ? "fa-IR" : "en-US";
    }
    return "en-US";
};

const tmdb = axios.create({
    baseURL: TMDB_BASE_API_URL,
    params: {
        api_key: TMDB_API_KEY,
    },
});

tmdb.interceptors.request.use((config) => {
    const locale = getLocale();

    config.params = {
        ...(config.params || {}),
        language: locale,
    };

    const token = Cookies.get("token");
    if (token) {
        (config.headers as any) = {
            ...(config.headers || {}),
            Authorization: `Bearer ${token}`,
        };
    }

    return config;
});

export default tmdb;
