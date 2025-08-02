import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";
import UploadAvatar from "../auth/fields/UploadAvatar";
import toast from "react-hot-toast";
import { useUpdateAvatar } from "../../pages/api/hooks/useUpdateAvatar";

const defaultAvatars = [
    "/assets/images/avatars/1.png",
    "/assets/images/avatars/2.png",
    "/assets/images/avatars/3.png",
    "/assets/images/avatars/4.png",
];

interface Props {
    currentAvatar: string;
}

const AvatarSelector: React.FC<Props> = ({ currentAvatar }) => {
    const { t } = useLanguage();
    const [selected, setSelected] = useState<string | null>(null);
    const [preview, setPreview] = useState<string>(currentAvatar);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const { register, handleSubmit } = useForm();

    const handleImageChange = (e: { target: { files: File[] } }) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setUploadedFile(file);
            setSelected(null);
        }
    };

    const handleSelect = (url: string) => {
        setSelected(url);
        setPreview(url);
        setUploadedFile(null);
    };

    const { updateAvatar, loading, error } = useUpdateAvatar();

    const onSubmit = async () => {
        try {
            if (uploadedFile) {
                await updateAvatar({ file: uploadedFile });
            } else if (selected) {
                await updateAvatar({ url: selected });
            }
            toast.success(t("panel.toastMessages.avatarSavedSuccess"));
        } catch (e) {
            toast.error("panel.toastMessages.avatarSaveError");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="text-center w-full">
            <UploadAvatar
                preview={preview}
                loading={false}
                t={t}
                register={register}
                handleImageChange={handleImageChange}
            />

            <h3 className="mb-8 font-medium">{t("panel.chooseAvatar")}</h3>

            <div className="flex justify-center gap-4 mb-4 flex-wrap mt-4">
                {defaultAvatars.map((url) => (
                    <button
                        key={url}
                        type="button"
                        onClick={() => handleSelect(url)}
                        className={`rounded-full ${
                            selected === url ? "ring-4 ring-indigo-500" : ""
                        }`}
                    >
                        <img
                            src={url}
                            alt="Avatar option"
                            className="w-12 h-12 rounded-full hover:ring-2 ring-indigo-400 transition"
                        />
                    </button>
                ))}
            </div>

            {(uploadedFile || selected) && (
                <div className="flex justify-center gap-4 mt-6">
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={loading}
                        style={loading ? { opacity: 0.5 } : {}}
                    >
                        {loading ? t("loading.title") : t("panel.save")}
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setPreview(currentAvatar);
                            setUploadedFile(null);
                            setSelected(null);
                        }}
                        className="btn-secondary"
                    >
                        {t("panel.cancel")}
                    </button>
                </div>
            )}
        </form>
    );
};

export default AvatarSelector;
