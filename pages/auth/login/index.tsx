import React from "react";
import LoginPage from "../../../components/auth/LoginForm";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

function index() {
    return (
        <>
            <Navbar />
            <LoginPage />
            <Footer />
        </>
    );
}

export default index;
