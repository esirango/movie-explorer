import React from "react";

const MovieCardSkeleton = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse">
            <div className="w-full h-64 bg-gray-300 dark:bg-gray-700" />
            <div className="p-4 flex flex-col gap-2">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
                <div className="flex justify-between mt-2">
                    <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
                    <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-700 rounded" />
                </div>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;
