// filtersOptions.ts
export const getGenres = (t: (key: string) => string) => [
    { id: "", name: t("movies.filters.genre"), disabled: true },
    { id: "28", name: t("movies.filters.genres.28") },
    { id: "12", name: t("movies.filters.genres.12") },
    { id: "16", name: t("movies.filters.genres.16") },
    { id: "35", name: t("movies.filters.genres.35") },
    { id: "80", name: t("movies.filters.genres.80") },
    { id: "99", name: t("movies.filters.genres.99") },
    { id: "18", name: t("movies.filters.genres.18") },
    { id: "10751", name: t("movies.filters.genres.10751") },
    { id: "14", name: t("movies.filters.genres.14") },
    { id: "36", name: t("movies.filters.genres.36") },
    { id: "27", name: t("movies.filters.genres.27") },
    { id: "10402", name: t("movies.filters.genres.10402") },
    { id: "9648", name: t("movies.filters.genres.9648") },
    { id: "10749", name: t("movies.filters.genres.10749") },
    { id: "878", name: t("movies.filters.genres.878") },
    { id: "10770", name: t("movies.filters.genres.10770") },
    { id: "53", name: t("movies.filters.genres.53") },
    { id: "10752", name: t("movies.filters.genres.10752") },
    { id: "37", name: t("movies.filters.genres.37") },
];

export const getCountries = (t: (key: string) => string) => [
    { code: "", name: t("movies.filters.country"), disabled: true },
    { code: "US", name: t("movies.filters.countries.US") },
    { code: "FR", name: t("movies.filters.countries.FR") },
    { code: "JP", name: t("movies.filters.countries.JP") },
    { code: "IR", name: t("movies.filters.countries.IR") },
    { code: "GB", name: t("movies.filters.countries.GB") },
    { code: "DE", name: t("movies.filters.countries.DE") },
    { code: "CA", name: t("movies.filters.countries.CA") },
    { code: "IT", name: t("movies.filters.countries.IT") },
    { code: "ES", name: t("movies.filters.countries.ES") },
    { code: "AU", name: t("movies.filters.countries.AU") },
    { code: "KR", name: t("movies.filters.countries.KR") },
    { code: "CN", name: t("movies.filters.countries.CN") },
    { code: "IN", name: t("movies.filters.countries.IN") },
    { code: "BR", name: t("movies.filters.countries.BR") },
    { code: "RU", name: t("movies.filters.countries.RU") },
    { code: "MX", name: t("movies.filters.countries.MX") },
    { code: "SE", name: t("movies.filters.countries.SE") },
    { code: "NL", name: t("movies.filters.countries.NL") },
];

export const getSortOptions = (t: (key: string) => string) => [
    { value: "", label: t("movies.filters.sort"), disabled: true },
    {
        value: "popularity.desc",
        label: t("movies.filters.sortOptions.popularity"),
    },
    {
        value: "release_date.desc",
        label: t("movies.filters.sortOptions.release_date"),
    },
    {
        value: "vote_average.desc",
        label: t("movies.filters.sortOptions.vote_average"),
    },
];
