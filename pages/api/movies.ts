import type { NextApiRequest, NextApiResponse } from "next";
import tmdb from "../../lib/axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { page = 1, query = "" } = req.query;

    try {
        const url = query ? "/search/movie" : "/trending/movie/week";
        const { data } = await tmdb.get(url, {
            params: {
                page,
                query,
                include_adult: false,
            },
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movies" });
    }
}
