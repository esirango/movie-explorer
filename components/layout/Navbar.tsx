import React from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";

const Navbar = () => {
    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between  sticky top-0 z-10">
            <Link
                href="/"
                className="lg:text-2xl  text-xl font-bold text-indigo-600 dark:text-indigo-400"
            >
                🎬 CinemaApp
            </Link>
            <div className="flex items-center space-x-4">
                <Link
                    href="/movies"
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                >
                    Movies
                </Link>
                <ThemeToggle />
            </div>
        </nav>
    );
};

export default Navbar;
