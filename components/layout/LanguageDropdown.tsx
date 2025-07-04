import React from "react";

const LanguageToggle = ({
    language,
    setLanguage,
    t,
    closeMenu,
}: {
    language: "en" | "fa";
    setLanguage: (lang: "en" | "fa") => void;
    t: (key: string) => string;
    closeMenu: () => void;
}) => {
    const toggleLanguage = () => {
        const nextLang = language === "en" ? "fa" : "en";
        setLanguage(nextLang);
        closeMenu();
    };

    return (
        <button
            onClick={toggleLanguage}
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
    );
};

export default LanguageToggle;
