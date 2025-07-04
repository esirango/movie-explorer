import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../../lib/tmdb";

interface HomeProps {
    sampleMovies: Movie[];
}

function TrendingMovies({ sampleMovies = [] }: HomeProps) {
    return (
        <section className="bg-gray-100 dark:bg-gray-800 py-16">
            <h2
                className="text-3xl font-bold text-center mb-10
                       text-gray-900 dark:text-gray-100"
            >
                Trending Movies
            </h2>
            <div className="flex flex-wrap justify-center max-w-6xl mx-auto">
                {sampleMovies.length > 0 ? (
                    sampleMovies
                        .slice(0, 5)
                        .map((movie, idx) => (
                            <MovieCard
                                key={idx}
                                title={movie.title}
                                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            />
                        ))
                ) : (
                    <p className="text-gray-600 dark:text-gray-400">
                        No movies found.
                    </p>
                )}
            </div>
        </section>
    );
}

export default TrendingMovies;
