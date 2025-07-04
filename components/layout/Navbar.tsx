import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className="lg:text-2xl text-[18px] font-bold text-indigo-600 dark:text-indigo-400"
                >
                    🎬 CinemaApp
                </Link>

                <div className="hidden md:flex items-center space-x-4">
                    <Link
                        href="/movies"
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                    >
                        Movies
                    </Link>
                    <ThemeToggle />
                </div>

                <div className="md:hidden flex items-center space-x-2">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-50 flex flex-col justify-center items-center w-8 h-8"
                        aria-label="Toggle Menu"
                    >
                        <motion.span
                            animate={
                                isOpen
                                    ? { rotate: 45, y: 6 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="w-6 h-[2px] bg-indigo-500 mb-1 origin-center"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-[2px] bg-indigo-500 mb-1"
                        />
                        <motion.span
                            animate={
                                isOpen
                                    ? { rotate: -45, y: -6 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="w-6 h-[2px] bg-indigo-500"
                        />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden mt-4 bg-gray-50 dark:bg-gray-900 rounded-xl px-4 py-3 shadow-inner"
                    >
                        <Link
                            href="/movies"
                            onClick={() => setIsOpen(false)}
                            className="block py-2 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                        >
                            🎥 Movies
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
