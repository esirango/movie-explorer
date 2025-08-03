import useSWRMutation from "swr/mutation";
import { fetcher } from "../fetcher";

const updateUsername = (url, { arg }) => {
    return fetcher(url, {
        method: "patch",
        data: { username: arg },
    });
};

export function useUpdateUsername() {
    const { trigger, isMutating, error, data, reset } = useSWRMutation(
        "/api/user/username",
        updateUsername
    );

    return {
        updateUsername: trigger,
        loading: isMutating,
        error,
        data,
        reset,
    };
}
