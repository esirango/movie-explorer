import React, { useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../../lang/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import { useRouter } from "next/router";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                <Link
                    href="/"
                    className={`lg:text-2xl text-[18px] font-bold ${
                        router.pathname === "/"
                            ? "text-indigo-800 dark:text-indigo-300"
                            : "text-indigo-600 dark:text-indigo-400"
                    }`}
                >
                    🎬 {t("global.appName")}
                </Link>

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
                        className={`font-medium transition-colors ${
                            router.pathname === "/movies"
                                ? "text-indigo-800 dark:text-indigo-300"
                                : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        }`}
                    >
                        {t("header.links")}
                    </Link>

                    {/* لینک ورود */}
                    <button
                        className={`font-medium transition-colors ${
                            router.pathname === "/auth/login"
                                ? "text-indigo-800 dark:text-indigo-300"
                                : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                        }`}
                    >
                        {t("auth.login")}
                    </button>

                    {/* لینک ثبت نام */}
                    <button
                        className={`font-semibold transition-colors ${
                            router.pathname === "/auth/register"
                                ? "text-indigo-900 dark:text-indigo-200 underline"
                                : "text-indigo-600 dark:text-indigo-400 hover:underline"
                        }`}
                    >
                        {t("auth.register")}
                    </button>

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

            <AnimatePresence>
                <AnimatePresence>
                    {isOpen && (
                        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
                    )}
                </AnimatePresence>
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
