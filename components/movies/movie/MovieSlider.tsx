import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
            spaceBetween={15}
            slidesPerView={3}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            breakpoints={{
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 2 },
                1280: { slidesPerView: 3 },
            }}
        >
            {movies.map((movie) => (
                <SwiperSlide key={movie.id}>
                    <Link
                        href={`/movies/${movie.id}/${encodeURIComponent(
                            movie.title
                        )}`}
                        className="w-48 mx-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transform transition-all duration-200 overflow-hidden block"
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
