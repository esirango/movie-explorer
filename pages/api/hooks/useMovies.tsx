import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Movie, Pagination } from "../../../types/movie";

import Cookies from "js-cookie";
import { useLang } from "../../../lang/hooks/useLang";

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

export const useMovies = (
    page: number,
    query?: string,
    initialData?: MoviesResponse
) => {
    const lang = useLang();
    const shouldFetch = !!page;
    const endpoint = query?.trim() ? "/search/movie" : "/trending/movie/week";

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        shouldFetch ? [endpoint, page, query, lang] : null,
        ([url, page, query, lang]) =>
            fetcher<MoviesResponse>(url, {
                params: {
                    page,
                    include_adult: false,
                    ...(query ? { query } : {}),
                    language: lang,
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
