import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_API_URL = process.env.TMDB_BASE_API_URL;

const tmdb = axios.create({
    baseURL: TMDB_BASE_API_URL,
    params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
    },
});

tmdb.interceptors.request.use((config) => {
    return config;
});

export default tmdb;
