import React, { useEffect } from "react";
import UserPanel from "../../components/panel/UserPanel";
import useAuthStore from "../../store/useAuthStore";
import { useRouter } from "next/router";

function index() {
    const router = useRouter();
    const { token, tokenLoading } = useAuthStore();

    useEffect(() => {
        if (!token && !tokenLoading) {
            router.replace("/");
        }
    }, [token, tokenLoading]);
    return (
        <>
            <UserPanel />
        </>
    );
}

export default index;
