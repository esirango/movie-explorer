import { motion } from "framer-motion";
import SpinningFilmReel from "./error/SpinnerFilmReel";

export const LoadingSpinner = () => {
    return (
        <div className="flex justify-center items-center py-20 gap-4">
            {/* <motion.div
                className="w-16 h-16 border-4 mx-4 border-indigo-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                }}
            /> */}
            <SpinningFilmReel size="12" />
            <motion.span
                className="ml-4 text-indigo-600 dark:text-indigo-400 font-semibold text-2xl select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                }}
            >
                Loading...
            </motion.span>
        </div>
    );
};
