import React from "react";
import Link from "next/link";
import { useTheme } from "../theme/ThemeProvider";
import { ThemeToggle } from "../theme/ThemeToggle";

const Navbar: React.FC = () => {
    const { theme, toggle } = useTheme();

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-10">
            <Link
                href="/"
                className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
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
