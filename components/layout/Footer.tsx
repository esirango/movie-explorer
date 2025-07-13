import React from "react";
import { useLanguage } from "../../lang/LanguageContext";

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="pt-12 pb-8 text-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300  select-none">
            <p>
                {t("footer.firstText")} ❤️ {t("footer.secondText")}
            </p>
        </footer>
    );
};

export default Footer;
