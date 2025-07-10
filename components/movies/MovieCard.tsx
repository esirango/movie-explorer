import React, { useState } from "react";
import { Movie } from "../../types/movie";
import Link from "next/link";
import IMDbVoteAverage from "./IMDbVoteAverage";
import MovieReleaseDate from "./movie/MovieReleaseDate";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/movies/${movie.id}/${movie.title}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
                {!imageError && movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        onError={() => setImageError(true)}
                        className="w-full h-64 object-cover"
                    />
                ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-600 text-center px-2">
                        <div className="text-5xl mb-2">🎬</div>
                    </div>
                )}
                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-semibold truncate text-gray-800 dark:text-white">
                        {movie.title}
                    </h3>

                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        {movie.overview}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <MovieReleaseDate
                            releaseDate={movie.release_date}
                            type="list"
                        />
                        <IMDbVoteAverage voteAverage={movie.vote_average} />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
