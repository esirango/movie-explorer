import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../lang/LanguageContext";
import {
    FilmIcon,
    GlobeIcon,
    LogInIcon,
    LogOutIcon,
    UserPlus,
} from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    token: string | null;
    onLogout: () => void;
}

import { useRouter } from "next/router";

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    setIsOpen,
    token,
    onLogout,
}) => {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();

    const closeMenu = () => setIsOpen(false);

    const iconClassName = "text-indigo-600 dark:text-indigo-400 text-xl";

    const getTextClassName = (href: string) => {
        if (router.pathname === href)
            return "font-semibold text-indigo-900 dark:text-indigo-300";
        return "font-semibold text-indigo-600 dark:text-indigo-400";
    };

    const menuItems = [
        {
            key: "movies",
            href: "/movies",
            Icon: FilmIcon,
            label: t("header.links"),
            onClick: closeMenu,
            specialClass: "",
        },
        // ,
        // {
        //     key: "login",
        //     href: "/auth/login",
        //     Icon: LogInIcon,
        //     label: t("auth.login"),
        //     onClick: closeMenu,
        // },
        // {
        //     key: "register",
        //     href: "/auth/register",
        //     Icon: UserPlus,
        //     label: t("auth.register"),
        //     onClick: closeMenu,
        //     specialClass: "hover:bg-indigo-100 dark:hover:bg-indigo-900",
        // },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 -translate-x-1/2 z-50 w-80 min-w-[90vw] bg-white dark:bg-gray-900 rounded-b-xl shadow-lg ring-1 ring-black ring-opacity-5"
        >
            <nav className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                {menuItems.map(
                    ({ key, href, Icon, label, onClick, specialClass }) => (
                        <Link
                            href={href}
                            key={key}
                            onClick={onClick}
                            className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition-colors rounded-none ${
                                specialClass ?? ""
                            } ${
                                router.pathname === href
                                    ? "bg-indigo-100 dark:bg-indigo-800"
                                    : "hover:bg-indigo-50 dark:hover:bg-indigo-800"
                            }`}
                        >
                            <Icon className={iconClassName} />
                            <span className={getTextClassName(href)}>
                                {label}
                            </span>
                        </Link>
                    )
                )}

                {/* {token ? (
                    <>
                        <div className="flex items-center gap-3 px-6 py-4 cursor-default">
                            <img
                                src="/user-avatar.png"
                                alt="User Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                                User
                            </span>
                        </div>
                        <button
                            onClick={() => {
                                onLogout();
                                closeMenu();
                            }}
                            className="flex items-center gap-3 px-6 py-4 cursor-pointer text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-800 rounded-b-xl transition-colors"
                        >
                            <LogOutIcon className="text-red-600 dark:text-red-400 text-xl" />
                            <span className="font-semibold">
                                {t("auth.logout") || "خروج"}
                            </span>
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            href="/auth/login"
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition-colors rounded-none ${
                                router.pathname === "/auth/login"
                                    ? "bg-indigo-100 dark:bg-indigo-800"
                                    : "hover:bg-indigo-50 dark:hover:bg-indigo-800"
                            }`}
                        >
                            <LogInIcon className={iconClassName} />
                            <span className={getTextClassName("/auth/login")}>
                                {t("auth.login")}
                            </span>
                        </Link>
                        <Link
                            href="/auth/register"
                            onClick={closeMenu}
                            className={`flex items-center gap-3 px-6 py-4 cursor-pointer transition-colors rounded-none ${
                                router.pathname === "/auth/register"
                                    ? "bg-indigo-100 dark:bg-indigo-800"
                                    : "hover:bg-indigo-50 dark:hover:bg-indigo-800"
                            }`}
                        >
                            <UserPlus className={iconClassName} />
                            <span
                                className={getTextClassName("/auth/register")}
                            >
                                {t("auth.register")}
                            </span>
                        </Link>
                    </>
                )} */}

                <div
                    onClick={() => {
                        const nextLang = language === "en" ? "fa" : "en";
                        setLanguage(nextLang);
                        closeMenu();
                    }}
                    className="flex items-center gap-3 px-6 py-4 cursor-pointer hover:bg-indigo-50 dark:hover:bg-indigo-800 transition-colors rounded-b-xl"
                    role="button"
                    aria-label={t("header.selectLanguage")}
                    title={t("header.selectLanguage")}
                >
                    <GlobeIcon className={iconClassName} />
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        {language === "en" ? "فارسی" : "English"}
                    </span>
                </div>
            </nav>
        </motion.div>
    );
};

export default MobileMenu;
