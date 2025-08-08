import useSWRMutation from "swr/mutation";
import { fetcher } from "../../fetcher";

interface AddFavoriteArgs {
    movieId: string;
    title: string;
    poster_path: string;
    vote_average: number;
}

async function addFavoriteFetcher(
    url: string,
    { arg }: { arg: AddFavoriteArgs }
) {
    return fetcher(url, {
        method: "post",
        data: arg,
    });
}

export function useAddFavorite() {
    return useSWRMutation("/api/favorites/add", addFavoriteFetcher);
}
