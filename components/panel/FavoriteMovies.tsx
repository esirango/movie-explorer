import React, { useState } from "react";
import { LoadingSpinner } from "../Loading";
import { useFavorites } from "../../pages/api/hooks/favorites/useFavorites";
import Link from "next/link";
import AddToFavorites from "../movies/AddToFavorites";
import IMDbVoteAverage from "../movies/IMDbVoteAverage";
import { Favorite, Movie } from "../../types/movie";
import GenericError from "../error/GenericError";
import { useLanguage } from "../../lang/LanguageContext";

const FavoriteMovies = ({ userId, userToken }) => {
    const { favorites, isLoading, mutate } = useFavorites();
    const [imageErrorMap, setImageErrorMap] = useState<{
        [key: string]: boolean;
    }>({});

    const { t } = useLanguage();

    if (isLoading) return <LoadingSpinner />;

    if (!favorites.length)
        return (
            <GenericError
                title={t("notFoundMovie.noFavorites")}
                message={
                    <>
                        {t("notFoundMovie.goToAddFavoritesPrefix")}{" "}
                        <Link
                            href="/movies"
                            className="text-indigo-600 underline"
                        >
                            {t("notFoundMovie.goToAddFavoritesLinkText")}
                        </Link>
                        .
                    </>
                }
            />
        );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favorites.map((movie: Favorite) => {
                const imageError = imageErrorMap[movie.movieId] || false;

                return (
                    <Link
                        key={movie.movieId}
                        href={`/movies/${movie.movieId}/${movie.title}`}
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer relative group ">
                            <AddToFavorites
                                movie={movie}
                                userToken={userToken}
                                initialIsFavorited={true}
                                size={20}
                                onChangeFavorites={mutate}
                            />

                            {!imageError && movie.poster_path ? (
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                    onError={() =>
                                        setImageErrorMap((prev) => ({
                                            ...prev,
                                            [movie.movieId]: true,
                                        }))
                                    }
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 text-center px-2">
                                    <div className="text-5xl mb-2">🎬</div>
                                </div>
                            )}

                            <div className="p-4 flex flex-col h-[100px] items-center gap-y-5">
                                <h3 className="text-lg font-semibold line-clamp-2 text-gray-800 dark:text-white">
                                    {movie.title}
                                </h3>

                                <IMDbVoteAverage
                                    voteAverage={movie.vote_average}
                                />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default FavoriteMovies;
