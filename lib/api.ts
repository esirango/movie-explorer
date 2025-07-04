import axios from "axios";
import { Movie, Pagination } from "../types/movie";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

export const fetchMovies = async (
    page: number,
    query?: string
): Promise<MoviesResponse> => {
    try {
        if (!TMDB_API_KEY) {
            console.warn("TMDB_API_KEY is missing");
            return { results: [], page: 1, total_pages: 1, total_results: 0 };
        }

        let url = "";
        let params: Record<string, any> = {
            api_key: TMDB_API_KEY,
            language: "en-US",
            page,
            include_adult: false,
        };

        if (query && query.trim() !== "") {
            url = "https://api.themoviedb.org/3/search/movie";
            params.query = query;
        } else {
            url = "https://api.themoviedb.org/3/trending/movie/week";
        }

        const { data } = await axios.get(url, { params });
        return data;
    } catch (error: any) {
        console.error("❌ Failed to fetch movies:", {
            message: error.message,
            code: error.code,
            stack: error.stack,
        });

        return {
            results: [],
            page: 1,
            total_pages: 1,
            total_results: 0,
        };
    }
};
