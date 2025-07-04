import React from "react";
import { Movie } from "../../types/movie";

interface MovieCardProps {
    movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer">
            {movie.poster_path ? (
                <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                />
            ) : (
                <div className="w-full h-64 flex items-center justify-center bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                    No Image
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
                    <span>📅 {movie.release_date}</span>
                    <span>⭐ {movie.vote_average}</span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
