import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { Movie } from "../../../types/movie";

interface Props {
    movies: Movie[];
}

const MovieSlider: React.FC<Props> = ({ movies }) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={8}
            slidesPerView="auto"
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id} className="!w-auto">
                    <Link
                        href={`/movies/${movie.id}/${encodeURIComponent(
                            movie.title
                        )}`}
                        className="w-48 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transform transition-all duration-200 overflow-hidden block"
                    >
                        <img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="h-64 w-full object-cover"
                        />
                        <div className="p-2 text-sm font-medium truncate text-center">
                            {movie.title}
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default MovieSlider;
