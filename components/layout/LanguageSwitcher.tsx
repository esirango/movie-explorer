import React from "react";

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
    const toggleLanguage = () => {
        const nextLang = language === "en" ? "fa" : "en";
        setLanguage(nextLang);
        Cookies.set("lang", nextLang);
        closeMenu();
    };

    return (
        <div
            onClick={toggleLanguage}
            className={`${
                type !== "phone" &&
                "bg-transparent border-none hover:opacity-[0.8] hover:transition-opacity transition-[0.5s] hover:bg-transparent"
            } cursor-pointer inline-flex items-center justify-center  h-12 rounded-md  px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
        >
            <button
                aria-label={t("header.selectLanguage")}
                title={t("header.selectLanguage")}
                className="ml-3"
            >
                <img
                    src={`/assets/images/lang/${
                        language === "en" ? "fa" : "en"
                    }.svg`}
                    alt={language === "en" ? "fa" : "en"}
                    className="w-6 h-6"
                />
            </button>
        </div>
    );
};

export default LanguageSwitcher;
