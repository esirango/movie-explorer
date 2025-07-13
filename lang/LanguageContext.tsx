import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";

import Cookies from "js-cookie";

type Language = "en" | "fa";

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

import en from "../lang/en.json";
import fa from "../lang/fa.json";

const translations = { en, fa };

const LanguageContext = createContext<LanguageContextProps>({
    language: "en",
    setLanguage: () => {},
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const lang = Cookies.get("lang");
        if (lang === "en" || lang === "fa") {
            setLanguage(lang);
        }
    }, []);

    const t = (key: string): string => {
        const keys = key.split(".");
        let text: any = translations[language];

        for (const k of keys) {
            if (text[k] === undefined) return key;
            text = text[k];
        }

        if (Array.isArray(text)) return text.join(", ");

        return text;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
