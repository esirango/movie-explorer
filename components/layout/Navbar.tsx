import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../lang/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className="lg:text-2xl text-[18px] font-bold text-indigo-600 dark:text-indigo-400"
                >
                    🎬 {t("global.appName")}
                </Link>

                {/* دسکتاپ */}
                <div className="hidden md:flex items-center space-x-6">
                    <LanguageSwitcher
                        type={"desktop"}
                        language={language}
                        setLanguage={setLanguage}
                        t={t}
                        closeMenu={() => setIsOpen(false)}
                    />
                    <Link
                        href="/movies"
                        className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                    >
                        {t("header.links")}
                    </Link>

                    <ThemeToggle />
                </div>

                {/* موبایل */}
                <div className="md:hidden flex items-center space-x-3">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative z-50 flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        <motion.span
                            animate={
                                isOpen
                                    ? { rotate: 45, y: 6 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="w-6 h-[2px] bg-indigo-500 mb-1 origin-center rounded"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-[2px] bg-indigo-500 mb-1 rounded"
                        />
                        <motion.span
                            animate={
                                isOpen
                                    ? { rotate: -45, y: -6 }
                                    : { rotate: 0, y: 0 }
                            }
                            className="w-6 h-[2px] bg-indigo-500 rounded"
                        />
                    </button>
                </div>
            </div>

            {/* منوی موبایل با انیمیشن */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="md:hidden mt-4 bg-gray-50 dark:bg-gray-900 rounded-xl px-5 py-4 shadow-inner flex flex-col space-y-3"
                    >
                        <LanguageSwitcher
                            type={"phone"}
                            language={language}
                            setLanguage={setLanguage}
                            t={t}
                            closeMenu={() => setIsOpen(false)}
                        />

                        <Link
                            href="/movies"
                            onClick={() => setIsOpen(false)}
                            className="block text-center text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            🎥 {t("header.links")}
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
