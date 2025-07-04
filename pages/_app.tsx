import { ThemeProvider } from "../components/theme/ThemeProvider";
import "../styles/globals.css";

import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
    return (
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
    );
}
