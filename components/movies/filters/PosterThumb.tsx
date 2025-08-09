import React, { useState, memo } from "react";

interface PosterThumbProps {
    posterPath?: string;
    title: string;
}

const PosterThumb: React.FC<PosterThumbProps> = memo(
    ({ posterPath, title }) => {
        const [error, setError] = useState(false);
        const [loading, setLoading] = useState(true);

        if (!posterPath || error) {
            return (
                <div className="w-8 h-12 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center text-lg text-white rounded">
                    🎬
                </div>
            );
        }

        return (
            <div className="w-8 h-12 relative">
                {loading && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
                )}
                <img
                    src={`https://image.tmdb.org/t/p/w92${posterPath}`}
                    alt={title}
                    width={32}
                    height={48}
                    className={`rounded object-cover transition-opacity duration-300 ${
                        loading ? "opacity-0" : "opacity-100"
                    }`}
                    onLoad={() => setLoading(false)}
                    onError={() => {
                        setError(true);
                        setLoading(false);
                    }}
                />
            </div>
        );
    }
);

export default PosterThumb;
