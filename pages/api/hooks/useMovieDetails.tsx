import useSWR from "swr";
import { fetcher } from "../fetcher";

export function useMovieDetails(id: string | null) {
    const { data, error, isLoading } = useSWR(
        id ? `/movie/${id}` : null,
        fetcher
    );

    return {
        movie: data,
        isLoading,
        isError: error,
    };
}
