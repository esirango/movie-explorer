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
    country?: string,
    sortBy?: string,
    year?: string,
    initialData?: MoviesResponse
) => {
    const lang = useLang();
    const shouldFetch = !!page;

    const endpoint = query?.trim()
        ? "/search/movie"
        : genre || country || sortBy || year
        ? "/discover/movie"
        : "/trending/movie/week";

    const params: Record<string, any> = {
        page,
        include_adult: false,
        language: lang,
    };

    if (query) params.query = query;
    if (genre) params.with_genres = genre;

    // استفاده از مپ برای تبدیل country به زبان یا کشور
    const countryToLanguageMap: Record<string, string> = {
        FR: "fr",
        US: "en",
        JP: "ja",
        IR: "fa",
    };

    if (country) {
        const langCode = countryToLanguageMap[country.toUpperCase()];
        if (langCode) {
            params.with_original_language = langCode;
        } else {
            params.with_origin_country = country.toUpperCase();
        }
    }

    if (sortBy) params.sort_by = sortBy;
    if (year) {
        params["primary_release_date.gte"] = `${year}-01-01`;
        params["primary_release_date.lte"] = `${year}-12-31`;
    }

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        shouldFetch ? [endpoint, params] : null,
        ([url, params]) => fetcher<MoviesResponse>(url, { params }),
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
