import useSWRMutation from "swr/mutation";
import { fetcher } from "../../fetcher";

async function removeFavoriteFetcher(url: string) {
    return fetcher(url, { method: "delete" });
}

export function useRemoveFavorite(movieId: string) {
    const { trigger, isMutating, error } = useSWRMutation(
        `/api/favorites/remove/${movieId}`,
        removeFavoriteFetcher
    );

    return {
        removeFavorite: trigger,
        isLoadingRemoveFavorite: isMutating,
        error,
    };
}
