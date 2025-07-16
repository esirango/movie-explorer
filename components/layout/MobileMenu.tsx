import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
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
    tokenLoading: boolean;
    iconClassName: string;
    defaultAvatar: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
    isOpen,
    setIsOpen,
    onLogout,
    user,
    token,
    tokenLoading,
    iconClassName,
    defaultAvatar,
}) => {
    const router = useRouter();
    const { language, setLanguage, t } = useLanguage();

    const closeMenu = () => setIsOpen(false);
    const [avatarLoading, setAvatarLoading] = useState(true);

    const getTextClassName = (href: string) =>
        router.pathname === href
            ? "font-semibold text-indigo-900 dark:text-indigo-300"
            : "font-semibold text-indigo-600 dark:text-indigo-400";

    const menuItems = [
        {
            key: "movies",
            href: "/movies",
            Icon: FilmIcon,
            label: t("header.links"),
            onClick: closeMenu,
            specialClass: "",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 -translate-x-1/2 z-50 w-80 min-w-[90vw] bg-white dark:bg-gray-900 rounded-b-xl shadow-lg ring-1 ring-black ring-opacity-5"
        >
            <nav className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
                {tokenLoading ? (
                    <div className="flex items-center gap-4 px-6 py-4">
                        {/* شبیه آواتار */}
                        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700 animate-pulse" />

                        {/* شبیه اسم */}
                        <div
                            className="flex-1 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"
                            style={{ maxWidth: "100px" }}
                        />

                        {/* شبیه آیکون خروج */}
                        <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse ml-auto" />
                    </div>
                ) : token && user ? (
                    <div className="flex justify-between items-center px-6 py-4">
                        <div className="relative w-10 h-10">
                            {avatarLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-5 h-5 border-2 border-t-indigo-500 border-indigo-200 rounded-full animate-spin"></div>
                                </div>
                            )}
                            <img
                                src={
                                    user?.avatar && !avatarLoading
                                        ? user.avatar
                                        : defaultAvatar
                                }
                                alt={t("auth.previewAvatarAlt")}
                                onLoad={() => setAvatarLoading(false)}
                                onError={() => setAvatarLoading(false)}
                                className={`w-10 h-10 rounded-full border-2 border-indigo-500 object-cover transition-opacity duration-300 ${
                                    avatarLoading ? "opacity-0" : "opacity-100"
                                }`}
                            />
                        </div>

                        {!avatarLoading && (
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400 truncate ml-3">
                                {user?.username}
                            </span>
                        )}

                        <button
                            onClick={() => {
                                onLogout();
                                closeMenu();
                            }}
                            className="group flex items-center gap-2 ml-auto"
                        >
                            <LogOutIcon
                                className={`${iconClassName} group-hover:text-indigo-800`}
                            />
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
