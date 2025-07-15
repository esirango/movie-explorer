import { GenreOption } from "../../components/movies/filters/MovieFilter";

export const genres: GenreOption[] = [
    { id: "", name: "Genre", disabled: true },
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "80", name: "Crime" },
    { id: "99", name: "Documentary" },
    { id: "18", name: "Drama" },
    { id: "10751", name: "Family" },
    { id: "14", name: "Fantasy" },
    { id: "36", name: "History" },
    { id: "27", name: "Horror" },
    { id: "10402", name: "Music" },
    { id: "9648", name: "Mystery" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Science Fiction" },
    { id: "10770", name: "TV Movie" },
    { id: "53", name: "Thriller" },
    { id: "10752", name: "War" },
    { id: "37", name: "Western" },
];

// کشورها
export const countries = [
    { code: "", name: "Country", disabled: true },
    { code: "US", name: "United States" },
    { code: "FR", name: "France" },
    { code: "JP", name: "Japan" },
    { code: "IR", name: "Iran" },
    { code: "GB", name: "United Kingdom" },
    { code: "DE", name: "Germany" },
    { code: "CA", name: "Canada" },
    { code: "IT", name: "Italy" },
    { code: "ES", name: "Spain" },
    { code: "AU", name: "Australia" },
    { code: "KR", name: "South Korea" },
    { code: "CN", name: "China" },
    { code: "IN", name: "India" },
    { code: "BR", name: "Brazil" },
    { code: "RU", name: "Russia" },
    { code: "MX", name: "Mexico" },
    { code: "SE", name: "Sweden" },
    { code: "NL", name: "Netherlands" },
];

// گزینه‌های مرتب‌سازی
export const sortOptions = [
    { value: "", label: "Sort", disabled: true },
    { value: "popularity.desc", label: "Popularity" },
    { value: "release_date.desc", label: "Release Date" },
    { value: "vote_average.desc", label: "Vote Average" },
];

// سال‌ها رو در کامپوننت می‌سازی چون مقدارش داینامیکه، اما اگر خواستی میتونی اینم جدا کنی
