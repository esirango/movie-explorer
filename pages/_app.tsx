import { useEffect } from "react";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { LanguageProvider, useLanguage } from "../lang/LanguageContext";
import Head from "next/head";
import useAuthStore, { User } from "../store/useAuthStore";
import Cookies from "js-cookie";
import { useCurrentUser } from "./api/hooks/useAuth";

export default function App({ Component, pageProps }) {
    const { token, setToken, setUser, logout } = useAuthStore();

    const { user }: { user: User | any } = useCurrentUser();

    useEffect(() => {
        const t = Cookies.get("token");
        if (t) {
            setToken(t);
        } else {
            logout();
        }
    }, [token, Cookies.get("token")]);

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user]);

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
            <link rel="icon" href="/favicon.ico" />
            <link
                href="https://cdn.fontcdn.ir/Font/Persian/Vazir/Vazir.css"
                rel="stylesheet"
                type="text/css"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
                rel="stylesheet"
            />
        </Head>
    );
}

function DirectionSetter() {
    const { language } = useLanguage();

    useEffect(() => {
        document.documentElement.dir = language === "fa" ? "rtl" : "ltr";
    }, [language]);

    return null;
}
