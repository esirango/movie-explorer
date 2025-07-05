// useLang.ts
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useLang = () => {
    const [lang, setLang] = useState(Cookies.get("lang") || "en");

    useEffect(() => {
        const interval = setInterval(() => {
            const current = Cookies.get("lang") || "en";
            setLang((prev) => (prev !== current ? current : prev));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return lang;
};
