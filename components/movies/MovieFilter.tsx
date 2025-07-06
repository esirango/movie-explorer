import React, { useState, useEffect } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { Search } from "lucide-react";

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
    "px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600";

const MovieFilter: React.FC<MovieFilterProps> = ({
    defaultValues,
    onSubmit,
}) => {
    const { t } = useLanguage();

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1899 }, (_, i) =>
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

    const [filters, setFilters] = useState(defaultValues);

    useEffect(() => {
        setFilters(defaultValues);
    }, [defaultValues]);

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-6 items-center">
            <div className="relative">
                <input
                    type="text"
                    placeholder={t("movies.filters.inputSearchPlaceholder")}
                    value={filters.query}
                    onChange={(e) =>
                        setFilters({ ...filters, query: e.target.value })
                    }
                    className={`${inputClass} pl-10`}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 w-5 h-5" />
            </div>

            <select
                value={filters.genre}
                onChange={(e) =>
                    setFilters({ ...filters, genre: e.target.value })
                }
                className={inputClass}
            >
                {genres.map((g) => (
                    <option key={g.id} value={g.id} disabled={g.disabled}>
                        {g.name}
                    </option>
                ))}
            </select>

            <select
                value={filters.country}
                onChange={(e) =>
                    setFilters({ ...filters, country: e.target.value })
                }
                className={inputClass}
            >
                {countries.map((c) => (
                    <option key={c.code} value={c.code} disabled={c.disabled}>
                        {c.name}
                    </option>
                ))}
            </select>

            <select
                value={filters.sortBy}
                onChange={(e) =>
                    setFilters({ ...filters, sortBy: e.target.value })
                }
                className={inputClass}
            >
                {sortOptions.map((s) => (
                    <option key={s.value} value={s.value} disabled={s.disabled}>
                        {s.label}
                    </option>
                ))}
            </select>

            <select
                value={filters.year}
                onChange={(e) =>
                    setFilters({ ...filters, year: e.target.value })
                }
                className={inputClass}
            >
                <option value="" disabled>
                    {t("movies.filters.year.selectYear")}
                </option>
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>

            <button
                onClick={() => onSubmit(filters)}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
            >
                <Search className="w-5 h-5" />
                {t("movies.filters.search")}
            </button>
        </div>
    );
};

export default MovieFilter;
