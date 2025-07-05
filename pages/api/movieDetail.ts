import tmdb from "./axios";

export const fetchMovieDetails = async (id: string) => {
    try {
        const { data } = await tmdb.get(`/movie/${id}`);
        return data;
    } catch (error: any) {
        // اگر 404 بود فیلم پیدا نشد
        if (error.response && error.response.status === 404) {
            return null;
        }
        // خطای شبکه یا هر خطای دیگه رو لاگ کن و null برگردون
        console.error("Error fetching movie details:", error.message || error);
        return null;
    }
};

export const fetchSimilarMovies = async (id: string) => {
    try {
        const { data } = await tmdb.get(`/movie/${id}/similar`);
        return data;
    } catch (error) {
        console.error("Error fetching similar movies:", error);
        return { results: [] };
    }
};
