import React from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TrendingMovies from "../components/landing/TrendingMovies";
import Landing from "../components/landing/Landing";
import { useTrendingMovies } from "./api/hooks/tmdb/useTrendingMovies";

export default function Home() {
    const { trendingMovies } = useTrendingMovies();

    return (
        <div className="relative min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden">
            <Navbar />
            <Landing />
            <TrendingMovies sampleMovies={trendingMovies} />
            <Footer />
        </div>
    );
}
