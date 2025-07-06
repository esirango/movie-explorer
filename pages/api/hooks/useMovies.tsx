import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Movie, Pagination } from "../../../types/movie";

import { useLang } from "../../../lang/hooks/useLang";

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

export const useMovies = (
    page: number,
    genre?: number,
    query?: string,
    initialData?: MoviesResponse
) => {
    const lang = useLang();
    const shouldFetch = !!page;
    const endpoint = query?.trim()
        ? "/search/movie"
        : genre
        ? "/discover/movie"
        : "/trending/movie/week";

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        shouldFetch ? [endpoint, page, query, genre, lang] : null,
        ([url, page, query, genre, lang]) =>
            fetcher<MoviesResponse>(url, {
                params: {
                    page,
                    include_adult: false,
                    language: lang,
                    ...(query ? { query } : {}),
                    ...(genre ? { with_genres: genre } : {}),
                },
            }),
        {
            revalidateOnFocus: false,
            fallbackData: initialData,
        }
    );

    return {
        data,
        isLoading,
        isError: !!error,
    };
};
