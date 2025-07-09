export interface Movie {
    genres: any;
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    release_date: string;
    vote_average: number;
    runtime: string;
    status: string;
    backdrop_path: string;
    original_language: string;
}

export interface Pagination {
    page: number;
    total_pages: number;
    total_results: number;
}
