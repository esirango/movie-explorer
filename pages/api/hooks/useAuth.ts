import useSWR from "swr";
import { fetcher } from "../fetcher";
import Cookies from "cookies-js";

interface User {
    email: string;
    password: string;
    // بقیه فیلدها
}

// GET یوزر فعلی
export function useCurrentUser() {
    const { data, error, mutate } = useSWR<User>("/api/auth/me", fetcher, {
        revalidateOnFocus: false,
    });

    return {
        user: data,
        isLoading: !error && !data,
        isError: error,
        mutate,
    };
}

// POST لاگین
export async function login(email: string, password: string) {
    const data = await fetcher<{ token: string }>("/api/auth/login", {
        method: "post",
        data: { email, password },
    });
    Cookies.set("token", data.token, { expires: 7 });
}

// POST ثبت نام
export async function register(email: string, password: string) {
    await fetcher("/api/auth/register", {
        method: "post",
        data: { email, password },
    });
}

// خروج
export function logout() {
    Cookies.expire("token");
}
