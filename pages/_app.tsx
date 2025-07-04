import { ThemeProvider } from "../components/theme/ThemeProvider";
import "../styles/globals.css";
export default function App({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
