import { fetcher } from "../../fetcher";

export async function useRemoveFavorite(movieId: string) {
    return fetcher(`/api/favorites/remove/${movieId}`, {
        method: "delete",
    });
}
