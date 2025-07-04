import React from "react";
import { GetServerSideProps } from "next";
import Footer from "../components/layout/Footer";

import Navbar from "../components/layout/Navbar";
import TrendingMovies from "../components/landing/TrendingMovies";
import Landing from "../components/landing/Landing";
import { fetchMovies } from "./api/movies";
import { Movie } from "../types/movie";

interface HomeProps {
    sampleMovies: Movie[];
}

export default function Home({ sampleMovies }: HomeProps) {
    return (
        <div className="relative min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 overflow-x-hidden">
            <Navbar />
            <Landing />
            <TrendingMovies sampleMovies={sampleMovies} />
            <Footer />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const movies = await fetchMovies(1);
        return {
            props: {
                sampleMovies: movies.results || [],
            },
        };
    } catch (error) {
        console.error("Failed to fetch movies:", error);
        return {
            props: {
                sampleMovies: [],
            },
        };
    }
};
