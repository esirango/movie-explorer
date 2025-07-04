import { useInView } from "react-intersection-observer";

function MovieCard({
    key,
    title,
    poster,
}: {
    key: string | number;
    title: string;
    poster: string;
}) {
    const { ref, inView } = useInView({
        triggerOnce: true,
        rootMargin: "100px",
    });

    return (
        <div
            ref={ref}
            className="w-[500px] md:w-[200px] rounded-lg overflow-hidden shadow-lg
                 bg-white text-gray-900
                 dark:bg-gray-800 dark:text-gray-100
                 mx-3 my-5 hover:scale-105 transition-transform cursor-pointer"
        >
            {inView ? (
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
    );
}

export default MovieCard;
