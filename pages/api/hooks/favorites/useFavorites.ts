import useSWR from "swr";
import { Movie } from "../../../../types/movie";
import { fetcher } from "../../fetcher";

export function useFavorites() {
    const { data, error, mutate } = useSWR<Movie[]>("/api/favorites", fetcher);

    return {
        favorites: data || [],
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
