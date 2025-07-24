import React, { useState } from "react";
import { useLanguage } from "../../lang/LanguageContext";

const defaultAvatars = [
    "/assets/images/avatars/1.png",
    "/assets/images/avatars/2.png",
    "/assets/images/avatars/3.png",
    "/assets/images/avatars/4.png",
];

const AvatarSelector = ({ currentAvatar }: { currentAvatar: string }) => {
    const { t } = useLanguage();
    const [selected, setSelected] = useState<string | null>(null);
    const [preview, setPreview] = useState<string>(currentAvatar);

    const handleSelect = (avatar: string) => {
        setSelected(avatar);
        setPreview(avatar);
    };

    const handleSubmit = async () => {
        try {
            // اینجا باید ریکوئست به API ارسال بشه
            console.log("Submitting avatar:", selected);
            // فرضاً آپدیت انجام شد، مقدار ثابت می‌مونه
            setSelected(null);
        } catch (error) {
            console.error("خطا در ثبت آواتار:", error);
        }
    };

    const handleCancel = () => {
        setPreview(currentAvatar);
        setSelected(null);
    };

    return (
        <div className="mb-6 text-center">
            <img
                src={preview || "/avatars/default.png"}
                alt="Avatar"
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover"
            />
            <h3 className="mb-2 font-medium">{t("panel.chooseAvatar")}</h3>
            <div className="flex justify-center gap-4 mb-2 mt-8 flex-wrap">
                {defaultAvatars.map((url) => (
                    <button
                        key={url}
                        onClick={() => handleSelect(url)}
                        className={`rounded-full ${
                            selected === url ? "ring-4 ring-indigo-500" : ""
                        }`}
                    >
                        <img
                            src={url}
                            alt="Avatar option"
                            className="w-12 h-12 rounded-full border-0 hover:ring-2 ring-indigo-400 transition"
                        />
                    </button>
                ))}
            </div>

            {selected && (
                <div className="flex justify-center gap-4 mt-8">
                    <button onClick={handleSubmit} className="btn-primary">
                        {t("save")}
                    </button>
                    <button onClick={handleCancel} className="btn-secondary">
                        {t("cancel")}
                    </button>
                </div>
            )}
        </div>
    );
};

export default AvatarSelector;
