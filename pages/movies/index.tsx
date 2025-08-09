import React, { useEffect, useState } from "react";
import Pagination from "../../components/movies/Pagination";
import MovieCard from "../../components/movies/MovieCard";
import LandingMovieSlider from "../../components/movies/landingMoviesSlider";
import { useRouter } from "next/router";
import MovieFilter from "../../components/movies/filters/MovieFilters";
import MovieCardSkeleton from "../../components/movies/shimmer/MovieCardSkeleton";
import { useMovies } from "../api/hooks/tmdb/useMovies";
import { getGenres } from "../../store/filters/movieFilterData";
import { useLanguage } from "../../lang/LanguageContext";
import GenericError from "../../components/error/GenericError";

interface GenreOption {
    id: string;
    name: string;
    disabled?: boolean;
}

const MoviesPage = () => {
    const router = useRouter();
    const { query } = router;
    const { t } = useLanguage();

    const [page, setPage] = useState(1);

    const genres = getGenres(t);

    const parseGenreFromQuery = (
        genreQuery: string | string[] | undefined
    ): GenreOption[] => {
        if (!genreQuery) return [];
        const genreIds = Array.isArray(genreQuery)
            ? genreQuery.map((g) => g.toString())
            : genreQuery.split(",");
        return genres.filter((g) => genreIds.includes(g.id));
    };

    const initialFilters = {
        query:
            typeof query.query === "string"
                ? query.query
                : Array.isArray(query.query)
                ? query.query[0]
                : "",
        genre: parseGenreFromQuery(query.genre),
        country:
            typeof query.country === "string"
                ? query.country
                : Array.isArray(query.country)
                ? query.country[0]
                : "",
        sortBy:
            typeof query.sortBy === "string"
                ? query.sortBy
                : Array.isArray(query.sortBy)
                ? query.sortBy[0]
                : "",
        year:
            typeof query.year === "string"
                ? query.year
                : Array.isArray(query.year)
                ? query.year[0]
                : "",
    };

    const [filters, setFilters] = useState(initialFilters);

    const genreIds =
        filters.genre.length > 0
            ? filters.genre.map((g) => Number(g.id))
            : undefined;

    const { data, isLoading, isError } = useMovies(
        page,
        genreIds,
        filters.query,
        filters.country,
        filters.sortBy,
        filters.year
    );

    const movies = data?.results || [];
    const totalPages = data?.total_pages || 1;

    const handleFilterSubmit = (newFilters: {
        query: string;
        genre: GenreOption[];
        country: string;
        sortBy: string;
        year: string;
    }) => {
        const queryObject = {
            ...newFilters,
            genre: newFilters.genre.map((g) => g.id).join(","),
        };

        router.push(
            {
                pathname: "/movies",
                query: {
                    ...queryObject,
                    page: 1,
                },
            },
            undefined,
            { shallow: true }
        );

        setFilters(newFilters);
        setPage(1);
    };

    useEffect(() => {
        const q = router.query;

        setFilters({
            query:
                typeof q.query === "string"
                    ? q.query
                    : Array.isArray(q.query)
                    ? q.query[0]
                    : "",
            genre: parseGenreFromQuery(q.genre),
            country:
                typeof q.country === "string"
                    ? q.country
                    : Array.isArray(q.country)
                    ? q.country[0]
                    : "",
            sortBy:
                typeof q.sortBy === "string"
                    ? q.sortBy
                    : Array.isArray(q.sortBy)
                    ? q.sortBy[0]
                    : "",
            year:
                typeof q.year === "string"
                    ? q.year
                    : Array.isArray(q.year)
                    ? q.year[0]
                    : "",
        });

        setPage(Number(q.page) || 1);
    }, [router.query]);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            <main className="container mx-auto px-4 py-8 flex-grow">
                <LandingMovieSlider movies={movies} />

                <MovieFilter
                    defaultValues={filters}
                    isLoading={isLoading}
                    onSubmit={handleFilterSubmit}
                />

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, idx) => (
                            <MovieCardSkeleton key={idx} />
                        ))}
                    </div>
                ) : isError || movies.length === 0 ? (
                    <GenericError
                        title={t("notFoundMovie.title")}
                        message={t("notFoundMovie.description")}
                        noBackground
                    />
                ) : (
                    <>
                        <div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
                            id="movie-list-top"
                        >
                            {movies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default MoviesPage;
