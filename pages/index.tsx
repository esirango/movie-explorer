import React from "react";
import { GetServerSideProps } from "next";
import Footer from "../components/layout/Footer";
import { fetchMovies } from "../lib/api";
import { Movie } from "../lib/tmdb";
import Navbar from "../components/layout/Navbar";
import dynamic from "next/dynamic";
import TrendingMovies from "../components/landing/TrendingMovies";
import Landing from "../components/landing/Landing";

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
