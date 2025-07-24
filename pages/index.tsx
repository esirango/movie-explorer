import React from "react";
import TrendingMovies from "../components/landing/TrendingMovies";
import Landing from "../components/landing/Landing";
import { useTrendingMovies } from "./api/hooks/tmdb/useTrendingMovies";

export default function Home() {
    const { trendingMovies, isLoading } = useTrendingMovies();

    return (
        <div className="relative min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden">
            <Landing />
            <TrendingMovies sampleMovies={trendingMovies} loading={isLoading} />
        </div>
    );
}
