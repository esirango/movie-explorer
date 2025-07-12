import React from "react";
import RegisterForm from "../../../components/auth/RegisterationForm";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

function index() {
    return (
        <>
            <Navbar />
            <RegisterForm />
            <Footer />
        </>
    );
}

export default index;
