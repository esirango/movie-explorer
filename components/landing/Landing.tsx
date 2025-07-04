import dynamic from "next/dynamic";

const InteractiveCinemaBackground = dynamic(
    () => import("./InteractiveCinemaBackground"),
    { ssr: false }
);

export default function Landing() {
    return (
        <div className="relative min-h-screen bg-gray-200 dark:bg-black dark:text-white overflow-hidden">
            <InteractiveCinemaBackground />

            <div
                className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full  left-1/2 top-[40%] bg-gradient-to-tr from-indigo-500 via-purple-700 to-indigo-600 opacity-60 blur-2xl"
                style={{
                    transform: `translate(-50%, -50%) scale(1.1)`,
                    transition: "transform 0.15s ease-out",
                    boxShadow:
                        "0 0 40px rgba(128,0,255,0.4), 0 0 25px rgba(255,0,150,0.3)",
                }}
            />
            <main className="relative z-10 flex flex-col justify-center items-center min-h-screen px-6 text-center select-none">
                <h1 className="text-5xl font-extrabold mb-6 leading-tight max-w-4xl">
                    Welcome to{" "}
                    <span className="dark:text-indigo-400 text-indigo-700">
                        CinemaApp
                    </span>
                </h1>
                <p className="max-w-2xl text-lg mb-12 px-4 dark:text-gray-300">
                    Discover trending movies with interactive animations that
                    respond to your mouse movement. Experience cinema like never
                    before.
                </p>

                <a
                    href="/movies"
                    className="mt-16 inline-block px-10 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold shadow-lg transition-colors duration-300"
                >
                    Explore Movies
                </a>
            </main>
        </div>
    );
}
