import React from "react";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";
import TrendingMovies from "../components/landing/TrendingMovies";
import Landing from "../components/landing/Landing";
import { fetchMovies, MoviesResponse, useMovies } from "./api/hooks/useMovies";

interface HomeProps {
    initialData: MoviesResponse;
}

export default function Home({ initialData }: HomeProps) {
    const { data } = useMovies(1, undefined, initialData);

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

export async function getServerSideProps() {
    const initialData = await fetchMovies(1);

    return {
        props: {
            initialData,
        },
    };
}
