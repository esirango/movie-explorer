import React from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import UserPanel from "../../components/panel/UserPanel";

function index() {
    return (
        <>
            <Navbar />
            <UserPanel />
            <Footer />
        </>
    );
}

export default index;
