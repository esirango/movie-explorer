import React, { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "../../lang/LanguageContext";
import confetti from "canvas-confetti";
import { useAddFavorite } from "../../pages/api/hooks/favorites/useAddFavorite";
import { useRemoveFavorite } from "../../pages/api/hooks/favorites/useRemoveFavorites";
import { Favorite, Movie } from "../../types/movie";

interface AddToFavoritesProps {
    movie: Movie | Favorite;
    userToken?: string;
    initialIsFavorited?: boolean;
    size?: number;
    inline?: boolean;
    onChangeFavorites?: () => void;
}

const AddToFavorites: React.FC<AddToFavoritesProps> = ({
    movie,
    userToken,
    initialIsFavorited,
    size = 20,
    inline,
    onChangeFavorites,
}) => {
    const { t } = useLanguage();
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { addFavorite, isLoadingAddFavorite } = useAddFavorite();

    const movieId = "id" in movie ? String(movie.id) : movie.movieId;

    const { removeFavorite, isLoadingRemoveFavorite } = useRemoveFavorite(
        String(movieId)
    );

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoadingAddFavorite || isLoadingRemoveFavorite) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isLoadingAddFavorite, isLoadingRemoveFavorite]);

    useEffect(() => {
        setIsFavorited(initialIsFavorited);
    }, [initialIsFavorited]);

    const handleAddFavorite = () => {
        return addFavorite({
            movieId: String(movieId),
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average > 0 ? movie.vote_average : 1,
        });
    };

    const triggerConfettiAroundButton = () => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
            particleCount: 25,
            startVelocity: 25,
            spread: 40,
            ticks: 50,
            gravity: 0.6,
            origin: { x, y },
            scalar: 0.5,
        });
    };

    const toggleFavorite = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userToken) {
            toast.error(t("toastMsgs.favorite_need_login"));
            return;
        }

        try {
            if (!isFavorited) {
                await handleAddFavorite();
                setIsFavorited(true);
                toast.success(
                    `${movie.title} ${t("toastMsgs.favorite_added")}`
                );
                triggerConfettiAroundButton();
            } else {
                await removeFavorite();
                setIsFavorited(false);
                toast.error(
                    `${movie.title} ${t("toastMsgs.favorite_removed")}`
                );
            }

            if (onChangeFavorites) onChangeFavorites();
        } catch (error) {
            toast.error(
                error?.response?.data?.message || t("toastMsgs.favorite_error")
            );
        }
    };
    return (
        <button
            ref={buttonRef}
            onClick={toggleFavorite}
            disabled={loading}
            className={`${
                inline
                    ? "p-1"
                    : "absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-700/70 backdrop-blur"
            } rounded-full transition-transform duration-300
    ${
        isFavorited
            ? "scale-110 text-red-500"
            : "text-gray-400 hover:text-red-400"
    }
    hover:scale-125 ${!loading ? "cursor-pointer" : "cursor-progress"}
    `}
        >
            <Heart
                className={`transition-all ${
                    loading ? "animate-heartbeat text-pink-500" : ""
                }`}
                size={size}
                fill={isFavorited ? "currentColor" : "none"}
            />
        </button>
    );
};

export default AddToFavorites;
