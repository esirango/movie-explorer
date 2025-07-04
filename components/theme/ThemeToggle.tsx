import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { MoonIcon, SunIcon } from "lucide-react";

export const ThemeToggle = () => {
    const { theme, toggle } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null; // ⛔ جلوگیری از hydration error

    const isDark = theme === "dark";

    return (
        <div className="relative w-16 h-8 overflow-hidden rounded-full">
            <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="w-16 h-8 rounded-full relative px-1 shadow-inner focus:outline-none"
            >
                <motion.div
                    className="absolute top-0 left-0 w-full h-full rounded-full"
                    initial={false}
                    animate={{
                        backgroundColor: isDark ? "#374151" : "#D1D5DB",
                    }}
                    transition={{ duration: 0.4 }}
                />

                <motion.div
                    className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center
                    bg-white dark:bg-yellow-300 text-gray-800 dark:text-yellow-900 shadow-md"
                    animate={{ x: isDark ? 32 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isDark ? "moon" : "sun"}
                            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {isDark ? (
                                <MoonIcon size={20} />
                            ) : (
                                <SunIcon size={20} />
                            )}
                        </motion.span>
                    </AnimatePresence>
                </motion.div>
            </button>
        </div>
    );
};
