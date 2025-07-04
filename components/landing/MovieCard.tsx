import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import Link from "next/link";

function MovieCard({
    id,
    title,
    poster,
    index = 0,
}: {
    id: number;
    title: string;
    poster: string;
    index?: number;
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "100px",
    });

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (inView) {
            const timeout = setTimeout(() => setVisible(true), index * 100);
            return () => clearTimeout(timeout);
        }
    }, [inView, index]);

    return (
        <Link href={`/movies/${id}/${title}`}>
            <div
                ref={ref}
                className={`lg:w-[500px] md:w-[300px] min-w-[200px] rounded-lg overflow-hidden shadow-lg
                bg-white text-gray-900
                dark:bg-gray-800 dark:text-gray-100
                mx-3 my-5 hover:scale-105 cursor-pointer
                transform transition-all duration-700 ease-out
                ${
                    visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-6"
                }
            `}
            >
                {visible ? (
                    <img
                        src={poster}
                        alt={title}
                        className="w-full h-fit object-cover"
                        loading="lazy"
                        draggable={false}
                    />
                ) : (
                    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                )}
                <div className="p-4">
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
            </div>
        </Link>
    );
}

export default MovieCard;
