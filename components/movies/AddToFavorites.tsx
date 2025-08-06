import React, { useState } from "react";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "../../lang/LanguageContext";

interface AddToFavoritesProps {
    movieId: number;
    movieTitle: string;
    userToken?: string;
    initialIsFavorited?: boolean;
    size?: number;
    inline?: boolean; // ✅ اضافه شده برای کنترل استایل
}

const AddToFavorites: React.FC<AddToFavoritesProps> = ({
    movieId,
    movieTitle,
    userToken,
    initialIsFavorited = false,
    size = 20,
    inline,
}) => {
    const { t } = useLanguage();
    const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
    const [loading, setLoading] = useState(false);

    const toggleFavorite = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        e.stopPropagation();

        if (!userToken) {
            toast.error(t("favorite_need_login"));
            return;
        }

        setLoading(true);

        try {
            // در اینجا API واقعی برای افزودن/حذف علاقه‌مندی رو صدا بزن
            // مثلا await fetch(`/api/favorites`, { method: isFavorited ? "DELETE" : "POST", body: ... })

            setIsFavorited(!isFavorited);

            if (!isFavorited) {
                toast.success(`${movieTitle} ${t("toastMsgs.favorite_added")}`);
            } else {
                toast.error(`${movieTitle} ${t("toastMsgs.favorite_removed")}`);
            }
        } catch (error) {
            toast.error(t("favorite_error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
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
