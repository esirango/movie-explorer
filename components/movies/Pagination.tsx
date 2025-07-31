import React from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { toPersianNumber } from "../../funcs/toPersianNumber";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const { language } = useLanguage();

    const pagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    const handlePageChange = (page: number) => {
        onPageChange(page);
        const topElement = document.getElementById("movie-list-top");
        if (topElement) {
            const yOffset = -80;
            const y =
                topElement.getBoundingClientRect().top +
                window.pageYOffset +
                yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="flex justify-center items-center mt-6 gap-2">
            <button
                className={`px-3 py-1 rounded border text-sm transition-colors duration-200 ${
                    currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-100 dark:hover:bg-indigo-600"
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>

            {pages.map((p) => {
                const isActive = p === currentPage;
                return (
                    <button
                        key={p}
                        className={`px-3 py-1 rounded text-sm transition-colors duration-200
                ${
                    isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-indigo-100 dark:hover:bg-indigo-600 hover:text-black dark:hover:text-white"
                }`}
                        onClick={() => handlePageChange(p)}
                    >
                        {language === "fa" ? toPersianNumber(p) : p}
                    </button>
                );
            })}

            <button
                className={`px-3 py-1 rounded border text-sm transition-colors duration-200 ${
                    currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-indigo-100 dark:hover:bg-indigo-600"
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
