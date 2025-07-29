import React, { useState, useEffect } from "react";
import { useLanguage } from "../../../lang/LanguageContext";
import { Search, ChevronDown, RotateCw } from "lucide-react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";
import GenreTags from "./GenreTags";
import { useRouter } from "next/router";
import {
    getGenres,
    getCountries,
    getSortOptions,
} from "../../../store/filters/movieFilterData";

export interface GenreOption {
    id: string;
    name: string;
    disabled?: boolean;
}

interface MovieFilterProps {
    defaultValues: {
        query: string;
        genre: GenreOption[];
        country: string;
        sortBy: string;
        year: string;
    };
    onSubmit: (filters: {
        query: string;
        genre: GenreOption[];
        country: string;
        sortBy: string;
        year: string;
    }) => void;
    isLoading: boolean;
}

const inputClass =
    "w-60 appearance-none px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-sm";

const dropdownClass = "outline-none relative w-60 text-sm z-100";

const listboxButtonClass =
    "w-60 py-2 pl-4 pr-10  rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const listboxOptionClass = ({ active, selected }: any) =>
    clsx(
        "cursor-pointer select-none px-4 py-2",
        active &&
            "bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-white",
        selected && "font-semibold"
    );

const MovieFilter: React.FC<MovieFilterProps> = ({
    defaultValues,
    onSubmit,
    isLoading,
}) => {
    const router = useRouter();
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1899 }, (_, i) =>
        (currentYear - i).toString()
    );

    const genres = getGenres(t);
    const countries = getCountries(t);
    const sortOptions = getSortOptions(t);

    const emptyValues = {
        query: "",
        genre: [],
        country: "",
        sortBy: "",
        year: "",
    };

    const years = [
        {
            value: "",
            label: t("movies.filters.year.selectYear"),
            disabled: true,
        },
        ...yearsList.map((y) => ({ value: y, label: y })),
    ];

    const [filters, setFilters] = useState({
        ...defaultValues,
        genre: defaultValues.genre || [],
    });

    useEffect(() => {
        setFilters({
            ...defaultValues,
            genre: defaultValues.genre || [],
        });
    }, [defaultValues]);

    const [listboxKey, setListboxKey] = useState(0);

    const renderGenreListbox = (genres: GenreOption[]) => (
        <div className={dropdownClass}>
            <Listbox
                key={listboxKey}
                value={filters.genre}
                onChange={(selectedGenres: GenreOption[]) => {
                    setFilters((prev) => ({
                        ...prev,
                        genre: selectedGenres,
                    }));
                    setListboxKey((prev) => prev + 1);
                }}
                multiple
            >
                <div className="relative">
                    <Listbox.Button className={listboxButtonClass}>
                        {filters?.genre?.length > 0
                            ? filters.genre[filters.genre.length - 1].name
                            : t("movies.filters.genre")}
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md z-20">
                        {genres.map((opt) => (
                            <Listbox.Option
                                key={opt.id}
                                value={opt}
                                disabled={opt.disabled}
                                className={listboxOptionClass}
                            >
                                <span
                                    className={clsx(
                                        filters.genre.some(
                                            (g) => g.id === opt.id
                                        ) && "font-semibold"
                                    )}
                                >
                                    {opt.name}
                                </span>
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );

    const renderListbox = (
        value: string,
        options: {
            id?: string;
            code?: string;
            value?: string;
            name?: string;
            label?: string;
            disabled?: boolean;
        }[],
        key: keyof typeof filters
    ) => (
        <div className={dropdownClass}>
            <Listbox
                value={value}
                onChange={(val) => setFilters({ ...filters, [key]: val })}
            >
                <div className="relative">
                    <Listbox.Button className={listboxButtonClass}>
                        {options.find(
                            (opt) =>
                                opt.id === value ||
                                opt.code === value ||
                                opt.value === value
                        )?.name ||
                            options.find(
                                (opt) =>
                                    opt.id === value ||
                                    opt.code === value ||
                                    opt.value === value
                            )?.label ||
                            "-"}
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md z-20">
                        {options.map((opt) => (
                            <Listbox.Option
                                key={opt.id || opt.code || opt.value}
                                value={opt.id || opt.code || opt.value}
                                disabled={opt.disabled}
                                className={listboxOptionClass}
                            >
                                {opt.name || opt.label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );

    return (
        <div className="flex flex-col my-24 justify-center gap-4 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-center w-full">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t("movies.filters.inputSearchPlaceholder")}
                        value={filters.query}
                        onChange={(e) =>
                            setFilters({ ...filters, query: e.target.value })
                        }
                        className={`${inputClass} pl-10 w-40`}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
                </div>

                {renderGenreListbox(genres)}
                {renderListbox(filters.country, countries, "country")}
                {renderListbox(filters.sortBy, sortOptions, "sortBy")}
                {renderListbox(filters.year, years, "year")}
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
                        onSubmit(emptyValues);
                        router.push(
                            {
                                pathname: "/movies",
                                query: {
                                    page: 1,
                                },
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

            <div className="w-60 flex  justify-end md:justify-center">
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
