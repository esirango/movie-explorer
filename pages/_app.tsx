import { useEffect } from "react";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import {
    LanguageProvider,
    useLanguage,
} from "../contexts/lang/LanguageContext";
import "../styles/globals.css";

import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
    function DirectionSetter() {
        const { language } = useLanguage();

        useEffect(() => {
            document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
        }, [language]);

        return null;
    }
    return (
        <LanguageProvider>
            <DirectionSetter />
            <ThemeProvider>
                <NextNProgress
                    color="#6366f1"
                    startPosition={0.3}
                    stopDelayMs={200}
                    height={3}
                    showOnShallow={true}
                />
                <Component {...pageProps} />
            </ThemeProvider>
        </LanguageProvider>
    );
}
