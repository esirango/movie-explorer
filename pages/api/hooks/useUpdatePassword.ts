// hooks/useUpdatePassword.js
import useSWRMutation from "swr/mutation";
import { fetcher } from "../fetcher";

const updatePassword = (url, { arg }) => {
    return fetcher(url, {
        method: "patch",
        data: {
            newPassword: arg.newPassword,
            confirmPassword: arg.confirmPassword,
        },
    });
};

export function useUpdatePassword() {
    const { trigger, isMutating, error, data, reset } = useSWRMutation(
        "/api/user/password",
        updatePassword
    );

    return {
        updatePassword: trigger,
        loading: isMutating,
        error,
        data,
        reset,
    };
}
