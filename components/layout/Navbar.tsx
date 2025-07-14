import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import Cookies from "js-cookie";

import { ThemeToggle } from "../theme/ThemeToggle";
import { useLanguage } from "../../lang/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileMenu from "./MobileMenu";
import useAuthStore from "../../store/useAuthStore";
import { LogInIcon, LogOutIcon, UserPlus } from "lucide-react";

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();
    const { user, token, logout } = useAuthStore();

    const iconClassName = "text-indigo-600 dark:text-indigo-400 text-xl";

    const handleLogout = () => {
        Cookies.remove("token");
        logout();
        router.push("/");
    };

    const isActive = (path: string) =>
        router.pathname === path
            ? "text-indigo-900 dark:text-indigo-400"
            : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400";

    const authLinks = [
        {
            href: "/auth/login",
            label: t("auth.login"),
            icon: <LogInIcon className="w-6 h-6" />,
        },
        {
            href: "/auth/register",
            label: t("auth.register"),
            icon: <UserPlus className="w-6 h-6" />,
        },
    ];
    return (
        <nav className="bg-gray-100 dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-50">
            <div className="flex justify-between items-center">
                {/* برند */}
                <div className="flex gap-4 items-center">
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
                    <div className="hidden md:block lg:block">
                        <ThemeToggle />
                    </div>
                </div>

                {/* دسکتاپ */}
                <div className="hidden md:flex items-center space-x-6">
                    <LanguageSwitcher
                        type="desktop"
                        language={language}
                        setLanguage={setLanguage}
                        t={t}
                        closeMenu={() => setIsOpen(false)}
                    />
                    <Link
                        href="/movies"
                        className={`font-medium ${isActive("/movies")}`}
                    >
                        {t("header.links")}
                    </Link>

                    {token && user ? (
                        <div className="flex items-center ">
                            <img
                                src={user?.avatar}
                                alt={t("auth.previewAvatarAlt")}
                                className="w-10 h-10 cursor-pointer rounded-full border-2 border-indigo-500 object-cover"
                            />

                            <button
                                onClick={() => {
                                    handleLogout;
                                }}
                                className="group flex items-center gap-3 px-6 py-4 cursor-pointer transition-colors duration-300"
                            >
                                <LogOutIcon
                                    className={`${iconClassName} group-hover:text-indigo-800`}
                                />
                                <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-800 group-hover:underline decoration-current">
                                    {/* {t("auth.logout") || "خروج"} */}
                                </span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center gap-3">
                                {authLinks.map(({ href, icon }) => {
                                    const isActive = router.pathname === href;
                                    const baseClasses =
                                        "flex items-center gap-2 px-1.5 py-1.5 rounded-md transition-colors duration-200";
                                    const activeClasses =
                                        "bg-indigo-500  dark:bg-indigo-700 text-white";
                                    const inactiveClasses =
                                        " text-indigo-700  dark:text-indigo-400 ";

                                    return (
                                        <Link
                                            key={href}
                                            href={href}
                                            className={`${baseClasses} ${
                                                isActive
                                                    ? activeClasses
                                                    : inactiveClasses
                                            }`}
                                        >
                                            {icon}
                                        </Link>
                                    );
                                })}
                            </div>
                        </>
                    )}
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

            {/* منوی موبایل */}
            <AnimatePresence>
                {isOpen && (
                    <MobileMenu
                        user={user}
                        token={token}
                        isOpen={isOpen}
                        iconClassName={iconClassName}
                        setIsOpen={setIsOpen}
                        onLogout={handleLogout}
                    />
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
