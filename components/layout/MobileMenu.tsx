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
    onLogout: () => void;
    user: any;
    token: string | null;
    iconClassName: string;
}

import { useRouter } from "next/router";

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    setIsOpen,
    onLogout,
    user,
    token,
    iconClassName,
}) => {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();

    const closeMenu = () => setIsOpen(false);

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
                {token && user ? (
                    <div className="flex justify-between">
                        <div className="group flex items-center gap-3 px-6 py-4 cursor-pointer transition-all duration-3000">
                            <img
                                src={`${user?.avatar}`}
                                alt={t("auth.previewAvatarAlt")}
                                className="w-9 h-9 rounded-full border-2 border-indigo-500 object-cover"
                            />
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 group-hover:underline decoration-current">
                                {user?.username}
                            </span>
                        </div>

                        <button
                            onClick={() => {
                                onLogout();
                                closeMenu();
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
                )}
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
