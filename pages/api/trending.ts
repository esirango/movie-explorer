import type { NextApiResponse } from "next";
import { fetcher } from "./fetcher";

export default async function handler(res: NextApiResponse) {
    try {
        const data = await fetcher("/trending/movie/week");
        res.status(200).json(data.results);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch trending movies" });
    }
}
