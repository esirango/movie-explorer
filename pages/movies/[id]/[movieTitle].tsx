import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Movie } from "../../../types/movie";
import { LoadingSpinner } from "../../../components/Loading";
import { fetchMovieDetails, fetchSimilarMovies } from "../../api/movieDetail";
import MovieSlider from "../../../components/movies/movie/MovieSlider";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

const MovieDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [movie, setMovie] = useState<Movie | null>(null);
    const [related, setRelated] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            (async () => {
                setLoading(true);
                const movieData = await fetchMovieDetails(id as string);
                const similar = await fetchSimilarMovies(id as string);
                setMovie(movieData);
                setRelated(similar.results);
                setLoading(false);
            })();
        }
    }, [id]);

    return (
        <div
            className={`bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen`}
        >
            <Navbar />
            {loading || !movie ? (
                <LoadingSpinner />
            ) : (
                <>
                    {/* Banner */}
                    <div
                        className="w-full h-[60vh] bg-cover bg-center relative "
                        style={{
                            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4">
                                {movie.title}
                            </h1>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="container mx-auto px-4 py-8">
                        <div className="flex flex-col md:flex-row gap-8">
                            {/* Poster */}
                            <img
                                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-xl w-full max-w-xs mx-auto md:mx-0"
                            />

                            {/* Info */}
                            <div className="flex-1 lg:space-y-12 md:space-y-12 space-y-4">
                                <p className="text-lg">{movie.overview}</p>

                                <div className="flex gap-4 text-sm flex-wrap">
                                    <span>
                                        📅 Release: {movie.release_date}
                                    </span>
                                    <span>⏱ Runtime: {movie.runtime} mins</span>
                                    <span>⭐ Rating: {movie.vote_average}</span>
                                    <span>🎯 Status: {movie.status}</span>
                                </div>

                                <div className="flex gap-2 flex-wrap mt-2">
                                    {movie.genres.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-800 dark:text-white rounded-full text-xs"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <h2 className="text-2xl font-bold mb-4">
                                Related Movies
                            </h2>
                            <MovieSlider movies={related} />
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
};

export default MovieDetailPage;
