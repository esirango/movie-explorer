import useSWR from "swr";
import { fetcher } from "../fetcher";

interface Favorite {
    movieId: string;
    title: string;
    // بقیه فیلدهای فیلم
}

// GET لیست علاقه‌مندی‌ها
export function useFavorites() {
    const { data, error, mutate } = useSWR<Favorite[]>(
        "/api/favorites",
        fetcher
    );

    return {
        favorites: data || [],
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}

// POST افزودن فیلم به علاقه‌مندی‌ها
export async function addFavorite(movieId: string) {
    await fetcher("/api/favorites", {
        method: "post",
        data: { movieId },
    });
}

// DELETE حذف فیلم از علاقه‌مندی‌ها
export async function removeFavorite(movieId: string) {
    await fetcher(`/api/favorites/${movieId}`, {
        method: "delete",
    });
}
