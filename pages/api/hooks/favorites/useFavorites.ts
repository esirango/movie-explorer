import useSWR from "swr";
import { Favorite } from "../../../../types/movie";
import { fetcher } from "../../fetcher";

export function useFavorites() {
    const { data, error, mutate } = useSWR<Favorite[]>(
        "/api/favorites/list",
        fetcher
    );

    return {
        favorites: data || [],
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}
