import React, { useRef, useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "../../lang/LanguageContext";
import confetti from "canvas-confetti";
import { useAddFavorite } from "../../pages/api/hooks/favorites/useAddFavorite";
import { useRemoveFavorite } from "../../pages/api/hooks/favorites/useRemoveFavorites";
import { Movie } from "../../types/movie";

interface AddToFavoritesProps {
    movie: Movie;
    userToken?: string;
    initialIsFavorited?: boolean;
    size?: number;
    inline?: boolean;
}

const AddToFavorites: React.FC<AddToFavoritesProps> = ({
    movie,
    userToken,
    initialIsFavorited = false,
    size = 20,
    inline,
}) => {
    const { t } = useLanguage();
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [loading, setLoading] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const { trigger, isMutating, error } = useAddFavorite();

    const handleAddFavorite = () => {
        return trigger({
            movieId: String(movie.id),
            title: movie.title,
            poster_path: movie.poster_path,
            vote_average: movie.vote_average,
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

        setLoading(true);

        try {
            if (!isFavorited) {
                await handleAddFavorite();
                setIsFavorited(true);
                toast.success(
                    `${movie.title} ${t("toastMsgs.favorite_added")}`
                );
                triggerConfettiAroundButton();
            } else {
                await useRemoveFavorite(String(movie.id));
                setIsFavorited(false);
                toast.error(
                    `${movie.title} ${t("toastMsgs.favorite_removed")}`
                );
            }
        } catch (error) {
            toast.error(t("toastMsgs.favorite_error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            ref={buttonRef}
            onClick={toggleFavorite}
            disabled={loading}
            title={t("add_to_favorites")}
            className={`${
                inline
                    ? "p-1"
                    : "absolute top-3 right-3 z-10 p-2 bg-white/80 dark:bg-gray-700/70 backdrop-blur"
            } rounded-full transition-transform duration-300 ${
                isFavorited
                    ? "scale-110 text-red-500"
                    : "text-gray-400 hover:text-red-400"
            } hover:scale-125`}
        >
            <Heart
                className="transition-all"
                size={size}
                fill={isFavorited ? "currentColor" : "none"}
            />
        </button>
    );
};

export default AddToFavorites;
