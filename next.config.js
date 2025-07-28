/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPWA({
    reactStrictMode: true,
    env: {
        TMDB_API_KEY: process.env.TMDB_API_KEY,
        TMDB_BASE_API_URL: process.env.TMDB_BASE_API_URL,
    },
    // output: "export",
    // basePath: "/movie-explorer",
    // trailingSlash: true,
});

module.exports = nextConfig;
