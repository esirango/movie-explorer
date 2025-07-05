import useSWR from "swr";
import Cookies from "cookies-js";
import { fetcher } from "../fetcher";
import { Movie } from "../../../types/movie";
import { useLang } from "../../../lang/hooks/useLang";

interface MoviesResponse {
    results: Movie[];
}

export function useSimilarMovies(id: string | null) {
    const lang = useLang();

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        id ? [`/movie/${id}/similar`, lang] : null,
        ([url, lang]) =>
            fetcher<MoviesResponse>(url, {
                params: {
                    language: lang,
                },
            })
    );

    return {
        similarMovies: data?.results || [],
        isLoading,
        isError: error,
    };
}
