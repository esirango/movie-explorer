import React from "react";
import { FrownIcon } from "lucide-react";

function NotFoundMovie() {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500 dark:text-gray-400">
            <FrownIcon size={"80px"} />
            <p className="text-lg font-semibold">No movies found</p>
            <p className="text-sm mt-2">
                Try adjusting your search or filters.
            </p>
        </div>
    );
}

export default NotFoundMovie;
