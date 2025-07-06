import React from "react";
import MovieSlider from "./MovieSlider";
import { useLanguage } from "../../../lang/LanguageContext";
import IMDbVoteAverage from "../IMDbVoteAverage";

function MovieDetails({ movie, related }) {
    const { t } = useLanguage();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Poster */}
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="rounded-xl w-full max-w-xs mx-auto md:mx-0"
                />

                {/* Info */}
                <div className="flex-1 lg:space-y-12 md:space-y-12 space-y-4">
                    <p className="text-lg">{movie.overview}</p>

                    <div className="flex gap-4 text-sm flex-wrap items-center">
                        <IMDbVoteAverage voteAverage={movie.vote_average} />
                        <span className="icon-text">
                            📅 {t("movieDetail.release")}: {movie.release_date}
                        </span>
                        <span className="icon-text">
                            ⏱ {t("movieDetail.runtime")}: {movie.runtime} mins
                        </span>
                        <span className="icon-text">
                            🎯 {t("movieDetail.status")}: {movie.status}
                        </span>
                    </div>

                    <div className="flex gap-2 flex-wrap mt-2">
                        {movie.genres.map(
                            (genre: { id: React.Key; name: string }) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white rounded-full text-xs"
                                >
                                    {genre.name}
                                </span>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Related Movies</h2>
                <MovieSlider movies={related} />
            </div>
        </div>
    );
}

export default MovieDetails;
