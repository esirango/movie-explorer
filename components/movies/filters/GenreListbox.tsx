import { Listbox } from "@headlessui/react";
import React, { useState } from "react";
import {
    dropdownClass,
    listboxButtonClass,
    listboxOptionClass,
} from "../../../store/filters/movieFilterStyles";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";
import { GenreOption } from "../../../types/filters";

interface Filters {
    query: string;
    genre: GenreOption[];
    country: string;
    sortBy: string;
    year: string;
}

interface GenreListboxProps {
    genres: GenreOption[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    t: (key: string) => string;
}

const GenreListbox: React.FC<GenreListboxProps> = ({
    genres,
    filters,
    setFilters,
    t,
}) => {
    const [listboxKey, setListboxKey] = useState(0);

    return (
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
};

export default GenreListbox;
