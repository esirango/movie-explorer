import React from "react";
import { useLanguage } from "../../lang/LanguageContext";
import Link from "next/link";

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="pt-12 pb-8 text-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300  select-none">
            <p>
                {t("footer.firstText")} ❤️{" "}
                <Link href="https://github.com/esirango">
                    {" "}
                    {t("footer.secondText")}
                </Link>
            </p>
        </footer>
    );
};

export default Footer;
