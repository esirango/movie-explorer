import React, { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";

const LanguageSwitcher = ({
    type,
    language,
    setLanguage,
    t,
    closeMenu,
}: {
    type: "desktop" | "phone";
    language: "en" | "fa";
    setLanguage: (lang: "en" | "fa") => void;
    t: (key: string) => string;
    closeMenu: () => void;
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (lang: "en" | "fa") => {
        setLanguage(lang);
        Cookies.set("lang", lang);
        closeMenu();
        setOpen(false);
    };

    // بستن منو وقتی بیرون کلیک میشه
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="relative inline-block text-left z-50">
            <button
                onClick={() => setOpen((prev) => !prev)}
                aria-label={t("header.selectLanguage")}
                title={t("header.selectLanguage")}
                className={`${
                    type !== "phone" &&
                    "bg-transparent border-none hover:opacity-80 transition-opacity"
                } cursor-pointer inline-flex items-center justify-center h-12 rounded-md px-4 py-2 font-semibold focus:outline-none text-white dark:text-gray-200`}
            >
                <img
                    src={`/assets/images/lang/${language}.svg`}
                    alt={language}
                    className="w-6 h-6"
                />
            </button>

            {open && (
                <div
                    className={`absolute -right-8 mt-2 w-28 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 bg-white dark:bg-gray-800 focus:outline-none`}
                >
                    <div className="py-1">
                        {["en", "fa"].map((lang) => (
                            <button
                                key={lang}
                                onClick={() =>
                                    handleSelect(lang as "en" | "fa")
                                }
                                className="flex items-center gap-4 w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <img
                                    src={`/assets/images/lang/${lang}.svg`}
                                    alt={lang}
                                    className="w-5 h-5"
                                />
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
