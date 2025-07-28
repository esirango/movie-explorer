import { useEffect } from "react";
import { ThemeProvider } from "../components/theme/ThemeProvider";
import "../styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { LanguageProvider, useLanguage } from "../lang/LanguageContext";
import Head from "next/head";
import useAuthStore, { User } from "../store/useAuthStore";
import Cookies from "js-cookie";
import { useCurrentUser } from "./api/hooks/useAuth";
import { Toaster } from "react-hot-toast";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }) {
    const { token, setToken, setUser, logout, setTokenLoading, tokenLoading } =
        useAuthStore();

    const { user, isLoading }: { user: User | any; isLoading: boolean } =
        useCurrentUser();

    const cookieToken = Cookies.get("token");

    useEffect(() => {
        if (cookieToken) {
            setTokenLoading(true);
            setToken(cookieToken);
            if (!isLoading) {
                setTokenLoading(false);
            }
        } else {
            setTokenLoading(false);
            logout();
        }
    }, [token, cookieToken, isLoading]);

    useEffect(() => {
        if (user && token) {
            setUser(user);
        }
    }, [user, token]);

    // service worker
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker
                    .register("/service-worker.js")
                    .then((registration) => {
                        console.log(
                            "Service Worker registered with scope:",
                            registration.scope
                        );
                    })
                    .catch((error) => {
                        console.error(
                            "Service Worker registration failed:",
                            error
                        );
                    });
            });
        }
    }, []);

    return (
        <LanguageProvider>
            <MetaHead />
            <DirectionSetter />
            <ThemeProvider>
                <Layout>
                    <NextNProgress
                        color="#6366f1"
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={3}
                        showOnShallow={true}
                    />
                    <Component {...pageProps} />
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            className: `
          px-4 py-3 rounded-2xl shadow-md border
          bg-white text-black border-gray-300
          dark:bg-zinc-800 dark:text-white dark:border-zinc-700
        `,
                            duration: 4000,
                            success: {
                                iconTheme: {
                                    primary: "#10b981",
                                    secondary: "#fff",
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: "#ef4444",
                                    secondary: "#fff",
                                },
                            },
                        }}
                    />
                </Layout>
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
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#4F46E5" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
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
