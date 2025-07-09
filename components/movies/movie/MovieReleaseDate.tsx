import React from "react";
import { useLanguage } from "../../../lang/LanguageContext";

function MovieReleaseDate({
    releaseDate,
    type,
}: {
    releaseDate: string;
    type: string;
}) {
    const { t } = useLanguage();

    const year = releaseDate?.slice(0, 4);
    const month = releaseDate?.slice(5, 7);

    const monthName = t(`movieDetail.months.${month}`) || month;

    return (
        <span className="icon-text">
            📅 {type === "detail" ? `${t("movieDetail.release")}: ` : ""}{" "}
            {monthName} {year}
        </span>
    );
}

export default MovieReleaseDate;
