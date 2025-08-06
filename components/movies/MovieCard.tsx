import React, { useState } from "react";
import { Movie } from "../../types/movie";
import Link from "next/link";
import IMDbVoteAverage from "./IMDbVoteAverage";
import MovieReleaseDate from "./movie/MovieReleaseDate";
import { Heart, HeartOff } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../../store/useAuthStore";
import { useLanguage } from "../../lang/LanguageContext";

interface MovieCardProps {
    movie: Movie;
    userFavorites?: number[];
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, userFavorites = [] }) => {
    const [imageError, setImageError] = useState(false);
    const [isFavorited, setIsFavorited] = useState(
        userFavorites.includes(movie.id)
    );

    const { t } = useLanguage();

    const { token } = useAuthStore();

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!token) {
            toast.error(t("toastMsgs.favorite_need_login"));
            return;
        }

        setIsFavorited((prev) => !prev);

        if (!isFavorited) {
            toast.success(`${movie.title} ${t("toastMsgs.favorite_added")}`);
        } else {
            toast.error(`${movie.title} ${t("toastMsgs.favorite_removed")}`);
        }
    };

    function truncateText(text: string, maxLength: number) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength) + "...";
    }

    return (
        <Link href={`/movies/${movie.id}/${movie.title}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer relative group">
                {/* آیکون قلب */}
                <button
                    onClick={toggleFavorite}
                    className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-transform duration-300
                        ${
                            isFavorited
                                ? "scale-110 text-red-500"
                                : "text-gray-400 group-hover:text-red-400"
                        }
                        hover:scale-125 bg-white/80 dark:bg-gray-700/70 backdrop-blur`}
                >
                    {isFavorited ? <Heart fill="currentColor" /> : <Heart />}
                </button>

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
                <div className="p-4 flex flex-col h-[140px]">
                    <h3 className="text-lg font-semibold truncate text-gray-800 dark:text-white">
                        {movie.title}
                    </h3>

                    <p className="text-sm text-gray-700 dark:text-gray-300 overflow-hidden flex-grow">
                        {truncateText(movie.overview, 70)}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4">
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
