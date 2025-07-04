import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { page = 1, query = "" } = req.query;

    try {
        let url = "";
        let params: Record<string, any> = {
            api_key: TMDB_API_KEY,
            language: "en-US",
            page,
            include_adult: false,
        };

        if (query) {
            url = "https://api.themoviedb.org/3/search/movie";
            params.query = query;
        } else {
            url = "https://api.themoviedb.org/3/trending/movie/week";
        }

        const response = await axios.get(url, { params });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}
