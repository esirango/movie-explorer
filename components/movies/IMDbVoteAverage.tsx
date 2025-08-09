import React from "react";

function IMDbVoteAverage({ voteAverage }: { voteAverage: number }) {
    return (
        <span className="flex flex-row-reverse gap-2 items-center">
            <span className="bg-[#f5c518] text-black border-black border-1 font-extrabold text-[11px] leading-none p-1 rounded-[4px] tracking-wider shadow-sm">
                IMDb
            </span>
            {voteAverage?.toFixed(1)} <span className="icon-text">⭐</span>
        </span>
    );
}

export default IMDbVoteAverage;
