import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Movie } from "../../../types/movie";

interface MoviesResponse {
    results: Movie[];
}

export function useTrendingMovies() {
    const { data, error, isLoading } = useSWR<MoviesResponse>(
        "/trending/movie/week",
        fetcher
    );

    return {
        trendingMovies: data?.results || [],
        isLoading,
        isError: error,
    };
}
