import tmdb from "./axios";
import { Movie, Pagination } from "../types/movie";

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

export const fetchMovies = async (
    page: number,
    query?: string
): Promise<MoviesResponse> => {
    try {
        let url = "";
        const params: Record<string, any> = {
            page,
            include_adult: false,
        };

        if (query?.trim()) {
            url = "/search/movie";
            params.query = query;
        } else {
            url = "/trending/movie/week";
        }

        const { data } = await tmdb.get(url, { params });
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
