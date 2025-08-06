import React from "react";
import { useRouter } from "next/router";
import { LoadingSpinner } from "../../../components/Loading";

import MovieBanner from "../../../components/movies/movie/MovieBanner";
import MovieDetails from "../../../components/movies/movie/MovieDetails";
import { useMovieDetails } from "../../api/hooks/tmdb/useMovieDetails";
import { useSimilarMovies } from "../../api/hooks/tmdb/useSimilarMovies";
import MovieDetailsSkeleton from "../../../components/movies/shimmer/MovieDetailSkeleton";
import MovieBannerSkeleton from "../../../components/movies/shimmer/MovieBannerSkeleton";
import GenericError from "../../../components/error/GenericError";
import { useLanguage } from "../../../lang/LanguageContext";
import useAuthStore from "../../../store/useAuthStore";

const MovieDetailPage = () => {
    const router = useRouter();
    const { token } = useAuthStore();
    const { t } = useLanguage();

    if (!router.isReady) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
                <div className="h-full my-40">
                    <LoadingSpinner />
                </div>
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
            {isError ? (
                <div className="h-full my-32">
                    <GenericError
                        title={t("notFoundMovie.title")}
                        message={t("notFoundMovie.description")}
                        noBackground
                    />
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
                                userToken={token}
                                related={similarMovies}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default MovieDetailPage;
