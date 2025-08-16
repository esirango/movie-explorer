import React, { useState } from "react";

function MovieBanner({ movie }) {
    const [imgError, setImgError] = useState(false);
    const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

    return (
        <div className="w-full h-[60vh] relative">
            {!imgError && movie.backdrop_path ? (
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url(${backdropUrl})`,
                    }}
                >
                    <img
                        src={backdropUrl}
                        alt=""
                        className="hidden"
                        onError={() => setImgError(true)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                        <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
                            {movie.title}
                        </h1>
                    </div>
                </div>
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-white text-center px-4">
                        🎬 {movie.title}
                    </h1>
                </div>
            )}
        </div>
    );
}

export default MovieBanner;
