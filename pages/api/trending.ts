import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/trending/movie/week`,
            {
                params: { api_key: TMDB_API_KEY, language: "en-US" },
            }
        );
        res.status(200).json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
