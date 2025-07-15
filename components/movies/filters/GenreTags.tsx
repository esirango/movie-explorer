import React from "react";

interface Genre {
    id: string;
    name: string;
}

interface GenreTagsProps {
    filters: {
        genre: Genre[];
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            query: string;
            genre: Genre[];
            country: string;
            sortBy: string;
            year: string;
        }>
    >;
    genres: {
        id?: string;
        value?: string;
        name?: string;
        label?: string;
        disabled?: boolean;
    }[];
}

const GenreTags: React.FC<GenreTagsProps> = ({
    filters,
    setFilters,
    genres,
}) => {
    if (!filters.genre.length) return null;

    return (
        <div className="flex flex-wrap gap-2 w-full justify-center mt-2">
            {filters.genre.map((genre) => (
                <span
                    key={genre.id}
                    className="flex items-center gap-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-700 dark:text-white px-3 py-1 rounded-full text-sm"
                >
                    {genre.name}
                    <button
                        type="button"
                        aria-label={`Remove genre ${genre.name}`}
                        onClick={() =>
                            setFilters((prev) => ({
                                ...prev,
                                genre: prev.genre.filter(
                                    (g) => g.id !== genre.id
                                ),
                            }))
                        }
                        className="text-xl font-bold hover:text-gray-300 transition-colors duration-300"
                    >
                        ×
                    </button>
                </span>
            ))}
        </div>
    );
};

export default GenreTags;
