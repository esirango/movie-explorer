import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Movie } from "../../../types/movie";

interface MoviesResponse {
    results: Movie[];
}

export function useSimilarMovies(id: string | null) {
    const { data, error, isLoading } = useSWR<MoviesResponse>(
        id ? `/movie/${id}/similar` : null,
        fetcher
    );

    return {
        similarMovies: data?.results || [],
        isLoading,
        isError: error,
    };
}
