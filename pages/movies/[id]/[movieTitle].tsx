import React from "react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "../../../components/Loading";

import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import NotFoundMovie from "../../../components/movies/NotFoundMovie";
import MovieBanner from "../../../components/movies/movie/MovieBanner";
import MovieDetails from "../../../components/movies/movie/MovieDetails";
import { useMovieDetails } from "../../api/hooks/useMovieDetails";
import { useSimilarMovies } from "../../api/hooks/useSimilarMovies";
import MovieDetailsSkeleton from "../../../components/movies/shimmer/MovieDetailSkeleton";
import MovieBannerSkeleton from "../../../components/movies/shimmer/MovieBannerSkeleton";

const MovieDetailPage = () => {
    const router = useRouter();

    if (!router.isReady) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                <Navbar />
                <div className="h-full my-40">
                    <LoadingSpinner />
                </div>
                <Footer />
            </div>
        );
    }

    const { id } = router.query;
    const movieId = typeof id === "string" ? id : null;

    const {
        movie,
        isLoading: isLoadingMovie,
        isError,
    } = useMovieDetails(movieId);
    const { similarMovies, isLoading: isLoadingSimilar } =
        useSimilarMovies(movieId);

    const loading = isLoadingMovie || isLoadingSimilar;

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <Navbar />
            {isError ? (
                <div className="h-full my-32">
                    <NotFoundMovie />
                </div>
            ) : (
                <>
                    {loading ? (
                        <>
                            <MovieBannerSkeleton />
                            <MovieDetailsSkeleton />
                        </>
                    ) : (
                        <>
                            <MovieBanner movie={movie} />
                            <MovieDetails
                                movie={movie}
                                related={similarMovies}
                            />
                        </>
                    )}
                </>
            )}
            <Footer />
        </div>
    );
};

export default MovieDetailPage;
