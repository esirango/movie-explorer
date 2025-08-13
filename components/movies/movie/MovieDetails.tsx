import React, { useState } from "react";
import MovieSlider from "./MovieSlider";
import { useLanguage } from "../../../lang/LanguageContext";
import IMDbVoteAverage from "../IMDbVoteAverage";
import Link from "next/link";
import { toPersianNumber } from "../../../funcs/toPersianNumber";
import MovieReleaseDate from "./MovieReleaseDate";
import AddToFavorites from "../AddToFavorites";
import { useFavorites } from "../../../pages/api/hooks/favorites/useFavorites";
import { Favorite } from "../../../types/movie";

function MovieDetails({ movie, related, userToken }) {
    const { t, language } = useLanguage();
    const [posterError, setPosterError] = useState<boolean>(false);

    const { favorites } = useFavorites();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Poster */}
                {!posterError && movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                        alt={movie.title}
                        className="rounded-xl w-full max-w-xs mx-auto md:mx-0"
                        onError={() => setPosterError(true)}
                    />
                ) : (
                    <div className="rounded-xl w-full max-w-xs mx-auto md:mx-0 h-[450px] bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-6xl text-white">
                        🎬
                    </div>
                )}

                {/* Info */}
                <div className="flex-1 lg:space-y-12 md:space-y-12 space-y-4">
                    {/* Title + Favorite */}
                    <div className="flex items-center lg:gap-4 md:gap-4 lg:justify-start md:justify-start justify-between">
                        <h1 className="text-2xl font-bold">{movie.title}</h1>
                        <AddToFavorites
                            movie={movie}
                            userToken={userToken}
                            initialIsFavorited={Boolean(
                                favorites.find(
                                    (favorite: Favorite) =>
                                        favorite.movieId === String(movie.id)
                                )
                            )}
                            size={24}
                            inline
                        />
                    </div>

                    <p className="text-lg">{movie.overview}</p>

                    <div className="flex gap-4 text-sm flex-wrap items-center">
                        <IMDbVoteAverage voteAverage={movie.vote_average} />
                        <MovieReleaseDate
                            releaseDate={movie.release_date}
                            type="detail"
                        />
                        <span className="icon-text">
                            ⏱ {t("movieDetail.runtime")}:{" "}
                            {language === "fa"
                                ? toPersianNumber(movie.runtime)
                                : movie.runtime}{" "}
                            {t("movieDetail.min")}
                        </span>
                        <span className="icon-text">
                            🎯 {t("movieDetail.status")}: {movie.status}
                        </span>

                        {/* Country */}
                        {movie.production_countries?.length > 0 && (
                            <div className="flex items-center flex-wrap gap-2">
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                                    {movie.production_countries.map((c) => (
                                        <Link
                                            key={c.iso_3166_1}
                                            href={`/movies?country=${c.iso_3166_1}`}
                                            className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                                        >
                                            <img
                                                src={`https://flagcdn.com/w40/${c.iso_3166_1.toLowerCase()}.png`}
                                                alt={c.name}
                                                className="w-6 h-4 rounded-sm object-cover"
                                            />
                                            <span className="text-sm">
                                                {c.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Genres */}
                    <div className="flex gap-2 flex-wrap mt-2">
                        {movie.genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/movies?genre=${genre.id}&genreName=${genre.name}`}
                                className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white rounded-full text-xs hover:bg-indigo-200 dark:hover:bg-indigo-700 transition"
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related */}
            {related.length > 0 && (
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-4">
                        {t("movieDetail.relatedMovies")}
                    </h2>
                    <MovieSlider movies={related} />
                </div>
            )}
        </div>
    );
}

export default MovieDetails;
