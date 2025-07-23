import React from "react";
import { useRouter } from "next/router";
import SpinningFilmReel from "../components/error/SpinnerFilmReel";

export default function Custom404() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 px-4 text-center">
            <h1 className="text-[11rem] text-[#C7D2FE] font-extrabold mb-6 select-none flex gap-4 items-center">
                4
                <SpinningFilmReel />4
            </h1>
            <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
            <p className="max-w-md mb-8 text-gray-400">
                Sorry, the page you are looking for does not exist. <br />
                The link might be broken or the page has been removed.
            </p>
            <button
                onClick={() => router.push("/")}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold transition"
            >
                Go Back Home
            </button>
        </div>
    );
}
