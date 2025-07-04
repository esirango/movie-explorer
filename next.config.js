/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        TMDB_API_KEY: process.env.TMDB_API_KEY,
    },
};

module.exports = nextConfig;
