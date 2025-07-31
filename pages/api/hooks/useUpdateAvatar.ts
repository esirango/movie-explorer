import { useState } from "react";
import { fetcher } from "../fetcher";
import Cookies from "js-cookie";
import { useCurrentUser } from "./useAuth";

export function useUpdateAvatar() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const { mutate } = useCurrentUser();

    async function updateAvatar(data: {
        file?: File;
        url?: string;
    }): Promise<{ avatar: string }> {
        setLoading(true);
        setError(null);

        try {
            const formData = new FormData();
            if (data.file) {
                formData.append("avatar", data.file);
            } else if (data.url) {
                formData.append("url", data.url);
            } else {
                throw new Error("No avatar data provided");
            }

            const token = Cookies.get("token");
            const res = await fetcher<{ avatar: string }>("/api/user/avatar", {
                method: "patch",
                data: formData,
                headers: {
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            await mutate();
            setLoading(false);
            return res;
        } catch (err: any) {
            setError(err);
            setLoading(false);
            throw err;
        }
    }

    return { updateAvatar, loading, error };
}
