// contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fa";

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

import en from "../../lang/en.json";
import fa from "../../lang/fa.json";

const translations = { en, fa };

const LanguageContext = createContext<LanguageContextProps>({
    language: "en",
    setLanguage: () => {},
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    // تابع ساده برای گرفتن متن از فایل ترجمه بر اساس کلید نقطه‌ای (dot notation)
    const t = (key: string): string => {
        const keys = key.split(".");
        let text: any = translations[language];

        for (const k of keys) {
            if (text[k] === undefined) return key; // اگر کلید وجود نداشت کلید را برگردان
            text = text[k];
        }

        // اگر مقدار رشته نبود مثلا آرایه بود، به سادگی join کن
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
