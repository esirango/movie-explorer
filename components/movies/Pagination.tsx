import React from "react";

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
            topElement.scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="flex justify-center items-center space-x-2 mt-6">
            <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Prev
            </button>
            {pages.map((p) => (
                <button
                    key={p}
                    className={`px-3 py-1 rounded border ${
                        p === currentPage
                            ? "bg-indigo-600 text-white"
                            : "bg-white dark:bg-gray-700"
                    }`}
                    onClick={() => handlePageChange(p)}
                >
                    {p}
                </button>
            ))}
            <button
                className="px-3 py-1 rounded border disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
