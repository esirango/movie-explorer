import type { NextApiRequest, NextApiResponse } from "next";
import tmdb from "../../lib/axios";

export default async function handler(res: NextApiResponse) {
    try {
        const { data } = await tmdb.get("/trending/movie/week");
        res.status(200).json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending movies" });
    }
}
