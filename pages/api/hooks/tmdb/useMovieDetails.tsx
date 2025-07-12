import useSWR from "swr";
import { fetcher } from "../../fetcher";
import { useLang } from "../../../../lang/hooks/useLang";
import { MoviesResponse } from "./useMovies";

export function useMovieDetails(id: string | null) {
    const lang = useLang();

    const { data, error, isLoading } = useSWR(
        id ? [`/movie/${id}`, lang] : null,
        ([url, lang]) =>
            fetcher<MoviesResponse>(url, {
                params: {
                    language: lang,
                },
            })
    );

    return {
        movie: data,
        isLoading,
        isError: error,
    };
}
