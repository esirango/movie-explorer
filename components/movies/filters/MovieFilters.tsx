import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../lang/LanguageContext";
import { RotateCw } from "lucide-react";
import GenreTags from "./GenreTags";
import { useRouter } from "next/router";
import {
    getGenres,
    listBoxTitles,
    emptyValues,
} from "../../../store/filters/movieFilterData";
import ListBox from "./ListBox";
import GenreListbox from "./GenreListbox";
import { MovieFilterProps } from "../../../types/filters";
import Search from "./Search";

import { Search as SearchIcon } from "lucide-react";

const MovieFilter: React.FC<MovieFilterProps> = ({
    defaultValues,
    onSubmit,
    isLoading,
}) => {
    const router = useRouter();
    const { t } = useLanguage();
    const genres = getGenres(t);

    const [searchTerm, setSearchTerm] = useState(defaultValues.query || "");

    const [filters, setFilters] = useState({
        ...defaultValues,
        genre: defaultValues.genre || [],
    });

    useEffect(() => {
        setFilters({
            ...defaultValues,
            genre: defaultValues.genre || [],
        });
        setSearchTerm(defaultValues.query || "");
    }, [defaultValues]);

    return (
        <div className="flex flex-col my-24 justify-center gap-4 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-center w-full">
                <Search
                    t={t}
                    setFilters={setFilters}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />
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
                    onClick={() => {
                        const updatedFilters = {
                            ...filters,
                            query: searchTerm,
                        };
                        setFilters(updatedFilters);
                        onSubmit(updatedFilters);
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
               disabled:bg-indigo-400 disabled:cursor-not-allowed disabled:shadow-none"
                    disabled={isLoading}
                >
                    <SearchIcon className="w-5 h-5" />
                    {t("movies.filters.search")}
                </button>
            </div>
        </div>
    );
};

export default MovieFilter;
