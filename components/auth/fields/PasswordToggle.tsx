import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { useLanguage } from "../../../lang/LanguageContext";

interface Props {
    visible: boolean;
    toggle: () => void;
}

const PasswordToggle: React.FC<Props> = ({ visible, toggle }) => {
    const { language } = useLanguage();

    return (
        <button
            type="button"
            onClick={toggle}
            className={`absolute ${
                language === "fa" ? "left-5" : "right-5"
            } top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-400 transition-colors duration-250`}
            tabIndex={-1}
        >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
    );
};

export default PasswordToggle;
