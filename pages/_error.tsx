import React from "react";
import Link from "next/link";
import { useLanguage } from "../lang/LanguageContext";
import SpinningFilmReel from "../components/error/SpinnerFilmReel";

const ErrorPage = ({ statusCode }: { statusCode?: number }) => {
    const { t, language } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-900 text-center px-4">
            <h1
                className={`text-[11rem] text-[#C7D2FE] font-extrabold mb-6 select-none flex gap-4 items-center ${
                    language === "fa" ? "flex-row-reverse" : "flex"
                }`}
            >
                5
                <SpinningFilmReel /> <SpinningFilmReel />
            </h1>

            <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">
                {statusCode === 404
                    ? t("errorPage.pageNotFound")
                    : t("errorPage.somethingWentWrong")}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
                {statusCode === 404
                    ? t("errorPage.pageNotFoundDesc")
                    : t("errorPage.tryAgainLater")}
            </p>

            <Link
                href="/"
                className="inline-block bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
            >
                {t("errorPage.backHome")}
            </Link>
        </div>
    );
};

ErrorPage.getInitialProps = ({ res, err }) => {
    const statusCode = res?.statusCode || err?.statusCode || 500;
    return { statusCode };
};

export default ErrorPage;
