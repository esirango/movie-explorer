import { useState, useEffect } from "react";
import useSWR from "swr";
import { useLang } from "../../../../lang/hooks/useLang";
import { Pagination, Movie } from "../../../../types/movie";
import { fetcher } from "../../fetcher";

export interface MoviesResponse extends Pagination {
    results: Movie[];
}

const countryToLanguageMap: Record<string, string> = {
    FR: "fr",
    US: "en",
    JP: "ja",
    IR: "fa",
};

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
    const [filtered, setFiltered] = useState<Movie[] | null>(null);
    const [totalResults, setTotalResults] = useState(0);
    const shouldFetch = true;

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

    if (!query) {
        if (genre) params.with_genres = genre;

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
    }

    const { data, error, isLoading } = useSWR<MoviesResponse>(
        shouldFetch ? [endpoint, params] : null,
        ([url, params]) => fetcher<MoviesResponse>(url, { params }),
        {
            revalidateOnFocus: false,
            fallbackData: initialData,
        }
    );

    const itemsPerPage = 20;

    useEffect(() => {
        if (!data) return;

        if (query?.trim()) {
            let filteredResults = data.results;

            if (genre)
                filteredResults = filteredResults.filter((movie) =>
                    movie.genre_ids.includes(genre)
                );

            if (year)
                filteredResults = filteredResults.filter((movie) => {
                    const y = new Date(movie.release_date)
                        .getFullYear()
                        .toString();
                    return y === year;
                });

            if (country) {
                const langCode = countryToLanguageMap[country.toUpperCase()];
                filteredResults = filteredResults.filter((movie) =>
                    langCode
                        ? movie.original_language === langCode
                        : movie.original_language === country.toLowerCase()
                );
            }

            setTotalResults(filteredResults.length);

            const paginated = filteredResults.slice(
                (page - 1) * itemsPerPage,
                page * itemsPerPage
            );

            setFiltered(paginated);
        } else {
            setFiltered(null);
            setTotalResults(data.total_results);
        }
    }, [data, query, genre, country, year, page]);

    return {
        data: filtered
            ? {
                  ...data!,
                  results: filtered,
                  total_results: totalResults,
                  total_pages: Math.ceil(totalResults / itemsPerPage),
              }
            : data,
        isLoading,
        isError: !!error,
    };
};
