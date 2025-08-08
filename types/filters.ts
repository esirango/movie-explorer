export interface GenreOption {
    id: string;
    name: string;
    disabled?: boolean;
}

export interface MovieFilterProps {
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

export interface Filters {
    query: string;
    genre: GenreOption[];
    country: string;
    sortBy: string;
    year: string;
}

export interface GenreListboxProps {
    genres: GenreOption[];
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    t: (key: string) => string;
}
