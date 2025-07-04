import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdb = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: TMDB_API_KEY,
        language: "en-US",
    },
});

tmdb.interceptors.request.use((config) => {
    return config;
});

export default tmdb;
