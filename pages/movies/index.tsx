import React, { useState } from "react";
import Footer from "../../components/layout/Footer";
import Pagination from "../../components/movies/Pagination";
import { LoadingSpinner } from "../../components/Loading";
import Navbar from "../../components/layout/Navbar";
import { useLanguage } from "../../lang/LanguageContext";
import NotFoundMovie from "../../components/movies/NotFoundMovie";
import MovieCard from "../../components/movies/MovieCard";
import { useMovies } from "../api/hooks/useMovies";
import LandingMovieSlider from "../../components/movies/landingMoviesSlider";
import { useRouter } from "next/router";

const MoviesPage = () => {
    const router = useRouter();

    const [query, setQuery] = useState("");
    const [page, setPage] = useState(1);

    const genreID = +router.query.genre as number | undefined;
    const genreName = router.query.genreName as string | undefined;

    const { t } = useLanguage();

    const { data, isLoading, isError } = useMovies(page, genreID, query);

    const movies = data?.results || [];
    const totalPages = data?.total_pages || 1;

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPage(1);
        setQuery(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow">
                {genreID ? (
                    <h1 className="text-2xl text-center mb-4 text-indigo-600 dark:text-indigo-300  font-bold">
                        {genreName}
                    </h1>
                ) : (
                    <LandingMovieSlider movies={movies} />
                )}

                <div className="flex justify-center">
                    <input
                        type="text"
                        value={query}
                        onChange={handleSearchChange}
                        placeholder={t("movies.inputSearchPlaceholder")}
                        className="w-full max-w-md px-4 py-2 mb-6 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                </div>

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
