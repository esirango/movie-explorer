import useSWR from "swr";
import { fetcher } from "../fetcher";
import Cookies from "js-cookie";
import { useState } from "react";

interface User {
    _id: string;
    email: string;
    username: string;
    avatar?: FileList;
}

// GET یوزر فعلی
export function useCurrentUser() {
    const token = typeof window !== "undefined" ? Cookies.get("token") : null;

    const { data, error, mutate, isLoading } = useSWR<User>(
        token ? "/api/auth/me" : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    return {
        user: data,
        isLoading: isLoading,
        isError: error,
        mutate,
    };
}

// لاگین با مدیریت لودینگ
export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function login(email: string, password: string) {
        setLoading(true);
        setError(null);
        try {
            const data = await fetcher<{ token: string }>("/api/auth/login", {
                method: "post",
                data: { email, password },
            });

            Cookies.set("token", data.token, { expires: 7, path: "/" });
            setLoading(false);
            return data;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    }

    return { login, loading, error };
}

// ثبت نام با مدیریت لودینگ
export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function apiRegister(
        email: string,
        password: string,
        username: string,
        avatarFile?: FileList
    ) {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("username", username);

            if (avatarFile) {
                formData.append("avatar", avatarFile[0]);
            }

            const data = await fetcher<{ token: string }>(
                "/api/auth/register",
                {
                    method: "post",
                    data: formData,
                }
            );

            Cookies.set("token", data.token, { expires: 7, path: "/" });
            setLoading(false);
            return data;
        } catch (err) {
            setError(err);
            setLoading(false);
            throw err;
        }
    }

    return { apiRegister, loading, error };
}

// خروج
export function logout() {
    Cookies.remove("token");
}
