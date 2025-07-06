import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import { Movie } from "../../types/movie";
import MovieBanner from "./movie/MovieBanner";

interface Props {
    movies: Movie[];
}

const LandingMovieSlider: React.FC<Props> = ({ movies }) => {
    return (
        <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={2}
            slidesPerView={1}
            loop={true}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            className="mb-10"
        >
            {movies.slice(15, 21).map((movie) => (
                <SwiperSlide key={movie.id} className="w-full ">
                    <Link
                        href={`/movies/${movie.id}/${encodeURIComponent(
                            movie.title
                        )}`}
                        className="w-full m-0 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transform transition-all duration-200 overflow-hidden block"
                    >
                        <MovieBanner movie={movie} />
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default LandingMovieSlider;
