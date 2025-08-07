import { fetcher } from "../../fetcher";

export async function useAddFavorite(movieId: string) {
    return fetcher("/api/favorites", {
        method: "post",
        data: { movieId },
    });
}
