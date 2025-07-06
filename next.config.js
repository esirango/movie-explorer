/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: "export",
    // basePath: "/movie-explorer",
    // trailingSlash: true,
    reactStrictMode: true,
    env: {
        TMDB_API_KEY: process.env.TMDB_API_KEY,
        TMDB_BASE_API_URL: process.env.TMDB_BASE_API_URL,
    },
};

module.exports = nextConfig;
