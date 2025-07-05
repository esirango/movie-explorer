import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useSimilarMovies(id: string | null) {
    const { data, error, isLoading } = useSWR(
        id ? `/movie/${id}/similar` : null,
        fetcher
    );

    return {
        similarMovies: data?.results || [],
        isLoading,
        isError: error,
    };
}
