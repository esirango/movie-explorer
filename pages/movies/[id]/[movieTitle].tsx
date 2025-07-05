import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "../../../types/movie";
import { LoadingSpinner } from "../../../components/Loading";
import { fetchMovieDetails, fetchSimilarMovies } from "../../api/movieDetail";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";
import NotFoundMovie from "../../../components/movies/NotFoundMovie";
import MovieBanner from "../../../components/movies/movie/MovieBanner";
import MovieDetails from "../../../components/movies/movie/MovieDetails";

const MovieDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [movie, setMovie] = useState<Movie | null>(null);
    const [related, setRelated] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        (async () => {
            setLoading(true);
            try {
                const movieData = await fetchMovieDetails(id as string);
                if (!movieData) {
                    // فیلم پیدا نشد (مثلاً 404)
                    setMovie(null);
                    setRelated([]);
                } else {
                    setMovie(movieData);
                    const similar = await fetchSimilarMovies(id as string);
                    setRelated(similar?.results || []);
                }
            } catch (err) {
                console.error("Failed to fetch movie data:", err);
                setMovie(null);
                setRelated([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
            <Navbar />
            {loading ? (
                <div className="h-full my-40">
                    <LoadingSpinner />
                </div>
            ) : !movie ? (
                <div className="h-full my-32">
                    <NotFoundMovie />
                </div>
            ) : (
                <>
                    <MovieBanner movie={movie} />
                    <MovieDetails movie={movie} related={related} />
                </>
            )}
            <Footer />
        </div>
    );
};

export default MovieDetailPage;
