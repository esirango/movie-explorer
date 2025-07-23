import React from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { XCircle } from "lucide-react";

interface Props {
    message?: string;
    retry?: () => void;
}

const PanelError = ({ message, retry }: Props) => {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col items-center justify-center p-6 bg-red-50 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md shadow">
            <XCircle
                size={48}
                className="mb-4 text-red-500 dark:text-red-300"
            />

            <h3 className="text-lg font-semibold mb-2">
                {t("panel.panelTitle") || "خطا در دریافت اطلاعات"}
            </h3>

            <p className="text-sm mb-4 text-center">
                {message ||
                    t("panel.panelMessage") ||
                    "مشکلی پیش آمده. لطفاً دوباره تلاش کنید."}
            </p>

            {retry && (
                <button
                    onClick={retry}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
                >
                    {t("retry") || "تلاش مجدد"}
                </button>
            )}
        </div>
    );
};

export default PanelError;
