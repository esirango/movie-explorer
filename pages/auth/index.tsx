import React, { useEffect } from "react";
import AnimatedBackground from "../../components/landing/AnimatedBackground";
import { useRouter } from "next/router";

function index() {
    const router = useRouter();

    useEffect(() => {
        router.push("/auth/register");
    });
    return (
        <>
            <AnimatedBackground />
        </>
    );
}

export default index;
