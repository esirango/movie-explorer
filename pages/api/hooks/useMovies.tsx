import { Movie, Pagination } from "../../../types/movie";

import useSWR from "swr";
import { fetcher } from "../fetcher";

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

export const useMovies = (page: number, query?: string) => {
    const shouldFetch = !!page;

    const endpoint = query?.trim() ? "/search/movie" : "/trending/movie/week";

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        shouldFetch ? [endpoint, page, query] : null,
        ([url, page, query]) =>
            fetcher<MoviesResponse>(url, {
                params: {
                    page,
                    include_adult: false,
                    ...(query ? { query } : {}),
                },
            }),
        {
            revalidateOnFocus: false,
        }
    );

    return {
        data,
        isLoading,
        isError: !!error,
    };
};
