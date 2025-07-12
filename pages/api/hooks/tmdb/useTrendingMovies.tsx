import useSWR from "swr";
import { useLang } from "../../../../lang/hooks/useLang";
import { Movie } from "../../../../types/movie";
import { fetcher } from "../../fetcher";

interface MoviesResponse {
    results: Movie[];
}

export function useTrendingMovies() {
    const lang = useLang();

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        ["/trending/movie/week", lang],
        ([url, lang]) =>
            fetcher<MoviesResponse>(url, {
                params: {
                    language: lang,
                },
            }),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        trendingMovies: data?.results || [],
        isLoading,
        isError: !!error,
    };
}
