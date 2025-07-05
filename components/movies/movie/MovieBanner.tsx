import React from "react";

function MovieBanner({ movie }) {
    return (
        <div
            className="w-full h-[60vh] bg-cover bg-center relative"
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
    );
}

export default MovieBanner;
