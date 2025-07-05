import useSWR from "swr";
import { fetcher } from "../fetcher";
import { Movie, Pagination } from "../../../types/movie";

import Cookies from "js-cookie";

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

export async function fetchMovies(
    page: number,
    query?: string,
    lang?: string
): Promise<MoviesResponse> {
    const endpoint = query?.trim() ? "/search/movie" : "/trending/movie/week";

    const response = await fetcher<MoviesResponse>(endpoint, {
        params: {
            page,
            include_adult: false,
            ...(query ? { query } : {}),
            language: lang,
        },
    });

    return response;
}

export const useMovies = (
    page: number,
    query?: string,
    initialData?: MoviesResponse
) => {
    const lang = Cookies.get("lang") || "en";

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
