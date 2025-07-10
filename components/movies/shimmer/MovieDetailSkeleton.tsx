// components/movies/skeletons/MovieDetailsSkeleton.tsx
import React from "react";

const MovieDetailsSkeleton = () => {
    return (
        <div className="container mx-auto px-4 py-8 animate-pulse">
            <div className="flex flex-col md:flex-row gap-8">
                <div className="rounded-xl w-full max-w-xs mx-auto md:mx-0 h-[450px] bg-gray-300 dark:bg-gray-700" />

                <div className="flex-1 lg:space-y-12 md:space-y-12 space-y-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/6" />

                    <div className="flex gap-4 flex-wrap mt-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"
                            />
                        ))}
                    </div>

                    <div className="flex gap-2 flex-wrap mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div
                                key={i}
                                className="px-3 py-1 bg-gray-300 dark:bg-gray-700 rounded-full text-xs w-20 h-6"
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-12 space-y-4">
                <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-40 bg-gray-300 dark:bg-gray-700 rounded"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsSkeleton;
