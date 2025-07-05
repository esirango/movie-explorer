import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useTrendingMovies() {
    const { data, error, isLoading } = useSWR("/trending/movie/week", fetcher);

    return {
        trendingMovies: data?.results || [],
        isLoading,
        isError: error,
    };
}
