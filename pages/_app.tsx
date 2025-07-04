import { useEffect } from "react";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { LanguageProvider, useLanguage } from "../lang/LanguageContext";
import Head from "next/head";

export default function App({ Component, pageProps }) {
    return (
        <LanguageProvider>
            <MetaHead />
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

function MetaHead() {
    const { t } = useLanguage();
    return (
        <Head>
            <title>{t("global.appName")}</title>
            <link
                rel="stylesheet"
                href="https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css"
            />
            <link rel="shortcut icon" href="🎬" type="image/x-icon" />
            <link
                href="https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css"
                rel="stylesheet"
                type="text/css"
            />
        </Head>
    );
}

// ✅ Dir تنظیم
function DirectionSetter() {
    const { language } = useLanguage();

    useEffect(() => {
        document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    }, [language]);

    return null;
}
