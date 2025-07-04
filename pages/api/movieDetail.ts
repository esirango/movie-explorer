import axios from "axios";

export const fetchMovieDetails = async (id: string) => {
    const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY&language=en-US`
    );
    return res;
};

export const fetchSimilarMovies = async (id: string) => {
    const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=YOUR_API_KEY&language=en-US`
    );
    return res;
};
