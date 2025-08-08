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
