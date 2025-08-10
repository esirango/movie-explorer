import React from "react";
import { useLanguage } from "../../lang/LanguageContext";
import SpinningFilmReel from "../error/SpinnerFilmReel";

interface Props {
    title?: string;
    message?: string;
    retry?: () => void;
    noBackground?: boolean;
}

const GenericError = ({ title, message, retry, noBackground }: Props) => {
    const { t, language } = useLanguage();

    return (
        <div
            className={`min-h-[250px] max-w-md mx-auto flex flex-col items-center justify-center p-8 rounded-lg
            ${noBackground ? "" : "bg-gray-100 dark:bg-gray-800"} 
            text-gray-700 dark:text-gray-200
            shadow-lg select-none
            ${language === "fa" ? "text-right" : "text-left"}`}
        >
            <div className="flex items-center justify-center mb-6 text-indigo-400 dark:text-indigo-300">
                <SpinningFilmReel />
            </div>

            <h3 className="text-2xl font-extrabold mb-3 gradient-text">
                {title || t("panel.panelTitle")}
            </h3>

            <p className="mb-6 text-sm leading-relaxed text-center gradient-text">
                {message || t("panel.panelMessage")}
            </p>

            {retry && (
                <button
                    onClick={retry}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md px-6 py-2 transition focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    type="button"
                >
                    {t("retry")}
                </button>
            )}
        </div>
    );
};

export default GenericError;
