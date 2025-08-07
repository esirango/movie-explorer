import { fetcher } from "../../fetcher";

export async function useRemoveFavorite(movieId: string) {
    return fetcher(`/api/favorites/${movieId}`, {
        method: "delete",
    });
}
