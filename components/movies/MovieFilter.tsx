import React, { useState, useEffect } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { Search, ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import clsx from "clsx";

interface MovieFilterProps {
    defaultValues: {
        query: string;
        genre: string;
        country: string;
        sortBy: string;
        year: string;
    };
    onSubmit: (filters: {
        query: string;
        genre: string;
        country: string;
        sortBy: string;
        year: string;
    }) => void;
}

const inputClass =
    "w-60 appearance-none px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-sm";

const dropdownClass = "relative w-60 text-sm z-100";

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
}) => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();
    const yearsList = Array.from({ length: currentYear - 1899 }, (_, i) =>
        (currentYear - i).toString()
    );

    const genres = [
        { id: "", name: t("movies.filters.genre"), disabled: true },
        { id: "28", name: t("movies.filters.genres.28") },
        { id: "12", name: t("movies.filters.genres.12") },
        { id: "16", name: t("movies.filters.genres.16") },
        { id: "35", name: t("movies.filters.genres.35") },
        { id: "80", name: t("movies.filters.genres.80") },
        { id: "99", name: t("movies.filters.genres.99") },
        { id: "18", name: t("movies.filters.genres.18") },
        { id: "10751", name: t("movies.filters.genres.10751") },
        { id: "14", name: t("movies.filters.genres.14") },
        { id: "36", name: t("movies.filters.genres.36") },
        { id: "27", name: t("movies.filters.genres.27") },
        { id: "10402", name: t("movies.filters.genres.10402") },
        { id: "9648", name: t("movies.filters.genres.9648") },
        { id: "10749", name: t("movies.filters.genres.10749") },
        { id: "878", name: t("movies.filters.genres.878") },
        { id: "10770", name: t("movies.filters.genres.10770") },
        { id: "53", name: t("movies.filters.genres.53") },
        { id: "10752", name: t("movies.filters.genres.10752") },
        { id: "37", name: t("movies.filters.genres.37") },
    ];

    const countries = [
        { code: "", name: t("movies.filters.country"), disabled: true },
        { code: "US", name: t("movies.filters.countries.US") },
        { code: "FR", name: t("movies.filters.countries.FR") },
        { code: "JP", name: t("movies.filters.countries.JP") },
        { code: "IR", name: t("movies.filters.countries.IR") },
    ];

    const sortOptions = [
        { value: "", label: t("movies.filters.sort"), disabled: true },
        {
            value: "popularity.desc",
            label: t("movies.filters.sortOptions.popularity"),
        },
        {
            value: "release_date.desc",
            label: t("movies.filters.sortOptions.release_date"),
        },
        {
            value: "vote_average.desc",
            label: t("movies.filters.sortOptions.vote_average"),
        },
    ];

    const years = [
        {
            value: "",
            label: t("movies.filters.year.selectYear"),
            disabled: true,
        },
        ...yearsList.map((y) => ({ value: y, label: y })),
    ];

    const [filters, setFilters] = useState(defaultValues);

    useEffect(() => {
        setFilters(defaultValues);
    }, [defaultValues]);

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
        <div className="flex flex-col  sm:flex-row flex-wrap my-24 justify-center gap-4 items-center bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
            {/* جستجو */}
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

            {/* فیلترها */}
            {renderListbox(filters.genre, genres, "genre")}
            {renderListbox(filters.country, countries, "country")}
            {renderListbox(filters.sortBy, sortOptions, "sortBy")}
            {renderListbox(filters.year, years, "year")}

            {/* دکمه جستجو */}
            <button
                onClick={() => onSubmit(filters)}
                className="flex lg:w-auto w-60 cursor-pointer items-center gap-2 px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
                <Search className="w-5 h-5" />
                {t("movies.filters.search")}
            </button>
        </div>
    );
};

export default MovieFilter;
