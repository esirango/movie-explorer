import React, { useEffect, useRef, useState } from "react";
import { useMovies } from "../../../pages/api/hooks/tmdb/useMovies";
import { Search as SearchIcon } from "lucide-react";
import { inputClass } from "../../../store/filters/movieFilterStyles";
import PosterThumb from "./PosterThumb";

function Search({ t, setFilters, searchTerm, setSearchTerm }) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { data: suggestions, isLoading } = useMovies(
        1,
        [],
        debouncedTerm,
        "",
        "",
        ""
    );

    const handleSelectMovie = (movie: any) => {
        setSearchTerm(movie.title);
        setFilters((prev: any) => ({ ...prev, query: movie.title }));
        setShowSuggestions(false);
    };

    useEffect(() => {
        if (!searchTerm) {
            setShowSuggestions(false);
        }
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-60" ref={wrapperRef}>
            <input
                type="text"
                placeholder={t("movies.filters.inputSearchPlaceholder")}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowSuggestions(true);
                }}
                onFocus={() => {
                    if (searchTerm.trim()) setShowSuggestions(true);
                }}
                className={`${inputClass} pl-10 w-full`}
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />

            {showSuggestions && (
                <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                    {/* حالت لودینگ */}
                    {isLoading &&
                        Array.from({ length: 5 }).map((_, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-2 px-3 py-2 animate-pulse"
                            >
                                <div className="w-8 h-12 bg-gray-300 dark:bg-gray-700 rounded" />
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32" />
                            </li>
                        ))}

                    {/* حالت بدون نتیجه */}
                    {!isLoading &&
                        debouncedTerm &&
                        suggestions?.results?.length === 0 && (
                            <li className="px-3 py-4 text-center text-sm gradient-text">
                                {t("movies.filters.noResults")}
                            </li>
                        )}

                    {/* حالت نمایش نتایج */}
                    {!isLoading &&
                        suggestions?.results?.length > 0 &&
                        suggestions.results.slice(0, 10).map((movie: any) => (
                            <li
                                key={movie.id}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    handleSelectMovie(movie);
                                }}
                                className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700"
                            >
                                <PosterThumb
                                    posterPath={movie.poster_path}
                                    title={movie.title}
                                />
                                <span className="text-sm">{movie.title}</span>
                            </li>
                        ))}
                </ul>
            )}
        </div>
    );
}

export default Search;
