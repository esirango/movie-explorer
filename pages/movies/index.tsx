import React, { useState } from "react";
import Footer from "../../components/layout/Footer";
import Pagination from "../../components/movies/Pagination";
import { LoadingSpinner } from "../../components/Loading";
import Navbar from "../../components/layout/Navbar";
import NotFoundMovie from "../../components/movies/NotFoundMovie";
import MovieCard from "../../components/movies/MovieCard";
import { useMovies } from "../api/hooks/useMovies";
import LandingMovieSlider from "../../components/movies/landingMoviesSlider";
import { useRouter } from "next/router";
import MovieFilter from "../../components/movies/MovieFilter";

const MoviesPage = () => {
    const router = useRouter();
    const { query } = router;

    const [page, setPage] = useState(1);

    const initialFilters = {
        query: (query.query as string) || "",
        genre: (query.genre as string) || "",
        country: (query.country as string) || "",
        sortBy: (query.sortBy as string) || "",
        year: (query.year as string) || "",
    };

    const [filters, setFilters] = useState(initialFilters);

    const { data, isLoading, isError } = useMovies(
        page,
        filters.genre ? +filters.genre : undefined,
        filters.query,
        filters.country,
        filters.sortBy,
        filters.year
    );

    const movies = data?.results || [];
    const totalPages = data?.total_pages || 1;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
                <LandingMovieSlider movies={movies} />

                <MovieFilter
                    defaultValues={filters}
                    isLoading={isLoading}
                    onSubmit={(newFilters) => {
                        setFilters(newFilters);
                        setPage(1);
                    }}
                />

                {isLoading ? (
                    <LoadingSpinner />
                ) : isError || movies.length === 0 ? (
                    <NotFoundMovie />
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
            <Footer />
        </div>
    );
};

export default MoviesPage;
