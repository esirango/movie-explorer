import React from "react";
import Flickity from "react-flickity-component";
import "flickity/css/flickity.css";
import Link from "next/link";
import { Movie } from "../../../types/movie";

interface Props {
    movies: Movie[];
}

const flickityOptions = {
    groupCells: true,
    pageDots: false,
    wrapAround: true,
};

const MovieSlider: React.FC<Props> = ({ movies }) => {
    return (
        <Flickity options={flickityOptions} className="gap-4">
            {movies.map((movie) => (
                <Link
                    key={movie.id}
                    href={`/movies/${movie.id}`}
                    className="w-48 mx-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transform transition-all duration-200 overflow-hidden"
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="h-64 w-full object-cover"
                    />
                    <div className="p-2 text-sm font-medium truncate text-center">
                        {movie.title}
                    </div>
                </Link>
            ))}
        </Flickity>
    );
};

export default MovieSlider;
