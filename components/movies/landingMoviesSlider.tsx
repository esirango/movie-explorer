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
    isLoading?: boolean;
}

const ShimmerSlide = () => (
    <div className="w-full h-[300px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
);

const LandingMovieSlider: React.FC<Props> = ({ movies, isLoading }) => {
    const isEmpty = isLoading || movies.length === 0;

    return (
        <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={2}
            slidesPerView={1}
            loop={!isEmpty}
            navigation={!isEmpty}
            pagination={isEmpty ? false : { clickable: true }}
            autoplay={isEmpty ? false : { delay: 3000 }}
            className="mb-10"
        >
            {isEmpty ? (
                <SwiperSlide>
                    <ShimmerSlide />
                </SwiperSlide>
            ) : (
                movies.slice(10, 15).map((movie) => (
                    <SwiperSlide key={movie.id} className="w-full">
                        <Link
                            href={`/movies/${movie.id}/${encodeURIComponent(
                                movie.title
                            )}`}
                            className="w-full m-0 bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transform transition-all duration-200 overflow-hidden block"
                        >
                            <MovieBanner movie={movie} />
                        </Link>
                    </SwiperSlide>
                ))
            )}
        </Swiper>
    );
};

export default LandingMovieSlider;
