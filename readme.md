# 🎬 Movie Explorer

A sleek and dynamic movie discovery web application built with **Next.js**, designed for seamless exploration of trending movies across different languages and regions.

## 🌟 Features

-   **🌍 Multilingual Support**

    -   Fully supports English and Persian (`fa`) with RTL layout for Persian.
    -   All content and labels adapt based on selected language.

-   **🎨 Dark & Light Mode**

    -   Users can toggle between light and dark themes for a personalized experience.

-   **🚀 Lazy Loading**

    -   Images and movie data are loaded lazily to improve performance and reduce initial load time.

-   **💫 Skeleton Loading (Shimmer)**

    -   Beautiful animated placeholders shown while movie data is loading.
    -   Mimics the layout of real content to provide a smooth and responsive UX.

-   **🎯 Advanced Movie Filtering**

    -   Filter movies by genre, release status, vote average, and more.
    -   Filters update results in real-time and adapt to selected language.

-   **✨ Interactive Animations**

    -   Smooth hover effects, animated transitions, and responsive UI interactions using **Framer Motion** and **TailwindCSS**.

-   **⭐ IMDB Integration**

    -   Displays IMDB ratings with official brand styling and icon.

-   **📱 Fully Responsive Design**

    -   Optimized for mobile, tablet, and desktop views with utility-first styling.

-   **🎞️ Flickity-powered Movie Slider**

    -   Responsive and autoplay-enabled sliders for trending and related movies.

-   **🔁 Dynamic Routing & Pagination**
    -   Clean, user-friendly navigation with page-based browsing.

## 🛠️ Tech Stack

-   **Framework**: Next.js
-   **Styling**: TailwindCSS
-   **Animations**: Framer Motion, Flickity
-   **Data Fetching**: SWR, Cookies
-   **Icons**: Font Awesome (including IMDB brand)
-   **Localization**: next/router + internal translation logic
-   **API**: The Movie Database (TMDB)

## 🚀 Getting Started

```bash
git clone https://github.com/esirango/movie-explorer
cd movie-explorer
npm install
npm run dev
```
