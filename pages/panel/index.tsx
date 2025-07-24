import React, { useEffect } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
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
            <Navbar />
            <UserPanel />
            <Footer />
        </>
    );
}

export default index;
