import React from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TrendingMovies from "../components/landing/TrendingMovies";
import Landing from "../components/landing/Landing";
import { useMovies } from "./api/hooks/useMovies";

export default function Home() {
    const { data, isLoading, isError } = useMovies(1);

    const sampleMovies = data?.results || [];

    return (
        <div className="relative min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden">
            <Navbar />
            <Landing />
            <TrendingMovies sampleMovies={sampleMovies} />
            <Footer />
        </div>
    );
}
