import tmdb from "../../lib/axios";

export const fetchMovieDetails = async (id: string) => {
    const { data } = await tmdb.get(`/movie/${id}`);
    return data;
};

export const fetchSimilarMovies = async (id: string) => {
    const { data } = await tmdb.get(`/movie/${id}/similar`);
    return data;
};
