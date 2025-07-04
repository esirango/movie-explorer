import {
    createContext,
    useState,
    useContext,
    useEffect,
    ReactNode,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
    theme: Theme;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "light",
    toggle: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("theme");
            if (stored === "light" || stored === "dark") {
                return stored;
            }
        }
        // اگر چیزی ذخیره نشده، حالت پیش‌فرض تم سیستم رو هم می‌توان تشخیص داد:
        if (typeof window !== "undefined") {
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;
            return prefersDark ? "dark" : "light";
        }
        return "light";
    });

    useEffect(() => {
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggle = () =>
        setTheme((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
