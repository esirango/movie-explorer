import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../../lang/LanguageContext";
import { Search, RotateCw } from "lucide-react";
import GenreTags from "./GenreTags";
import { useRouter } from "next/router";
import {
    getGenres,
    listBoxTitles,
    emptyValues,
} from "../../../store/filters/movieFilterData";
import { inputClass } from "../../../store/filters/movieFilterStyles";
import ListBox from "./ListBox";
import GenreListbox from "./GenreListbox";
import { MovieFilterProps } from "../../../types/filters";
import { useMovies } from "../../../pages/api/hooks/tmdb/useMovies";
import PosterThumb from "./PosterThumb";

const MovieFilter: React.FC<MovieFilterProps> = ({
    defaultValues,
    onSubmit,
    isLoading,
}) => {
    const router = useRouter();
    const { t } = useLanguage();
    const genres = getGenres(t);

    const [searchTerm, setSearchTerm] = useState(defaultValues.query || "");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
    const [filters, setFilters] = useState({
        ...defaultValues,
        genre: defaultValues.genre || [],
    });

    const wrapperRef = useRef<HTMLDivElement>(null);

    const { data: suggestions } = useMovies(1, [], debouncedTerm, "", "", "");

    const handleSelectMovie = (movie: any) => {
        setSearchTerm(movie.title);
        setFilters((prev) => ({ ...prev, query: movie.title }));
        setShowSuggestions(false);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm);
        }, 400);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        setFilters({
            ...defaultValues,
            genre: defaultValues.genre || [],
        });
        setSearchTerm(defaultValues.query || "");
    }, [defaultValues]);

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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="flex flex-col my-24 justify-center gap-4 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-center w-full">
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />

                    {showSuggestions && suggestions?.results?.length > 0 && (
                        <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-auto z-50">
                            {suggestions.results.map((movie: any) => (
                                <li
                                    key={movie.id}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        handleSelectMovie(movie);
                                    }}
                                    className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-indigo-100 dark:hover:bg-indigo-700"
                                >
                                    <PosterThumb
                                        key={movie.id}
                                        posterPath={movie.poster_path}
                                        title={movie.title}
                                    />
                                    <span className="text-sm">
                                        {movie.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <GenreListbox
                    genres={genres}
                    filters={filters}
                    setFilters={setFilters}
                    t={t}
                />

                {listBoxTitles(t).map((listBox) => (
                    <ListBox
                        options={listBox.options}
                        value={filters[listBox.title]}
                        setFilters={setFilters}
                        filters={filters}
                        keyName={listBox.title}
                        key={listBox.title}
                    />
                ))}

                <div className="block md:hidden">
                    <GenreTags
                        filters={filters}
                        setFilters={setFilters}
                        genres={genres}
                    />
                </div>
                <button
                    onClick={() => {
                        setFilters(emptyValues);
                        setSearchTerm("");
                        onSubmit(emptyValues);
                        router.push(
                            {
                                pathname: "/movies",
                                query: { page: 1 },
                            },
                            undefined,
                            { shallow: true }
                        );
                    }}
                    disabled={isLoading}
                    className="md:mt-0 w-60 md:w-auto flex items-center justify-center disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:shadow-none px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 group"
                >
                    <RotateCw className="w-5 h-5 transition-transform duration-500 group-hover:rotate-180" />
                </button>
            </div>

            <div className="hidden md:block">
                <GenreTags
                    filters={filters}
                    setFilters={setFilters}
                    genres={genres}
                />
            </div>

            <div className="w-60 flex justify-end md:justify-center">
                <button
                    onClick={() => onSubmit(filters)}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
               disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:shadow-none"
                    disabled={isLoading}
                >
                    <Search className="w-5 h-5" />
                    {t("movies.filters.search")}
                </button>
            </div>
        </div>
    );
};

export default MovieFilter;
