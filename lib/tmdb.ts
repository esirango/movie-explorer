import axios from "axios";

export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export const fetchTrending = async (): Promise<Movie[]> => {
    const { data } = await axios.get("/api/trending");
    return data;
};
