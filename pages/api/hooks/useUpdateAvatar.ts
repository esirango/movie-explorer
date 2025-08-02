import useSWRMutation from "swr/mutation";
import Cookies from "js-cookie";
import { fetcher } from "../fetcher";
import { useCurrentUser } from "./useAuth";

type AvatarInput = {
    file?: File;
    url?: string;
};

async function updateAvatarFn(
    url: string,
    { arg }: { arg: AvatarInput }
): Promise<{ avatar: string }> {
    const formData = new FormData();
    if (arg.file) {
        formData.append("avatar", arg.file);
    } else if (arg.url) {
        formData.append("url", arg.url);
    } else {
        throw new Error("No avatar data provided");
    }

    const token = Cookies.get("token");
    return fetcher<{ avatar: string }>(url, {
        method: "patch",
        data: formData,
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        },
    });
}

export function useUpdateAvatar() {
    const { mutate: mutateUser } = useCurrentUser();

    const {
        trigger: updateAvatar,
        isMutating: loading,
        error,
    } = useSWRMutation("/api/user/avatar", updateAvatarFn, {
        onSuccess: async () => {
            await mutateUser();
        },
    });

    return { updateAvatar, loading, error };
}
