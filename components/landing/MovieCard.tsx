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
    const [imgError, setImgError] = useState(false);

    useEffect(() => {
        if (inView) {
            const timeout = setTimeout(() => setVisible(true), index * 100);
            return () => clearTimeout(timeout);
        }
    }, [inView, index]);

    const imageBoxClass = "aspect-[2/3] min-h-[300px] w-full";

    return (
        <Link href={`/movies/${id}/${title}`}>
            <div
                ref={ref}
                className={`
        w-[250px] sm:w-[250px] md:w-[300px] lg:w-[500px]
        rounded-lg overflow-hidden shadow-lg
        bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100
        mx-3 my-5 hover:scale-105 cursor-pointer
        transform transition-all duration-700 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
            >
                {visible ? (
                    !imgError ? (
                        <img
                            src={poster}
                            alt={title}
                            className={`${imageBoxClass} object-cover`}
                            loading="lazy"
                            draggable={false}
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <div
                            className={`${imageBoxClass} flex items-center justify-center bg-gray-300 dark:bg-gray-700`}
                        >
                            <span className="text-5xl">🎬</span>
                        </div>
                    )
                ) : (
                    <div
                        className={`${imageBoxClass} bg-gray-200 dark:bg-gray-700 animate-pulse`}
                    />
                )}
                <div className="p-4">
                    <h3 className="font-semibold text-lg">{title}</h3>
                </div>
            </div>
        </Link>
    );
}
export default MovieCard;
