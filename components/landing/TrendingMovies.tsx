import React from "react";
import MovieCard from "./MovieCard";
import { useLanguage } from "../../lang/LanguageContext";
import { Movie } from "../../types/movie";
import { LoadingSpinner } from "../Loading";
import GenericError from "../error/GenericError";

interface HomeProps {
    sampleMovies: Movie[];
    loading: boolean;
}

function TrendingMovies({ sampleMovies = [], loading }: HomeProps) {
    const { t } = useLanguage();
    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
            <h2
                className="text-3xl font-bold text-center mb-10
                       text-gray-900 dark:text-gray-100"
            >
                {t("trendingMoviesSection.title")}
            </h2>
            <div className="flex flex-wrap justify-center max-w-6xl mx-auto">
                {sampleMovies.length > 0 ? (
                    sampleMovies
                        .slice(0, 6)
                        .map((movie) => (
                            <MovieCard
                                id={movie.id}
                                key={movie.id}
                                title={movie.title}
                                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            />
                        ))
                ) : loading ? (
                    <LoadingSpinner />
                ) : (
                    <GenericError
                        title={t("notFoundMovie.title")}
                        message={t("errorPage.tryAgainLater")}
                        noBackground
                    />
                )}
            </div>
        </section>
    );
}

export default TrendingMovies;
