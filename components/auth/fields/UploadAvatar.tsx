import React, { SetStateAction, useState } from "react";
import { Camera, Plus, UserCircle, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { convertHeicToJpeg } from "../../../funcs/utils/heicConverter";

interface UploadAvatarProps {
    preview: string;
    loading: boolean;
    t: (key: string) => string;
    register: any;
    isConverting: boolean;
    setIsConverting: React.Dispatch<React.SetStateAction<boolean>>;
    handleImageChange: (e: { target: { files: File[] } }) => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({
    preview,
    loading,
    isConverting,
    setIsConverting,
    t,
    register,
    handleImageChange,
}) => {
    const [isDragging, setIsDragging] = useState(false);

    const processFile = async (file: File) => {
        setIsConverting(true);
        const convertedFile = await convertHeicToJpeg(file, t);
        setIsConverting(false);

        if (!convertedFile) return;

        if (!convertedFile.type.startsWith("image/")) {
            toast.error(
                t("auth.onlyImageAllowed") || "Only image files are allowed."
            );
            return;
        }

        const changeEvent = { target: { files: [convertedFile] } };
        handleImageChange(changeEvent);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        await processFile(file);
    };

    const handleInputChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        await processFile(file);
    };

    return (
        <div
            onDrop={handleDrop}
            onDragOver={(e) => {
                if (isConverting || loading) return;
                e.preventDefault();
                setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            className="relative h-full flex justify-center items-center mb-6 p-3 rounded-xl cursor-pointer select-none"
        >
            {preview ? (
                <img
                    src={preview}
                    alt={t("auth.previewAvatarAlt")}
                    className={`w-40 h-40 rounded-full border-4 border-indigo-500 object-cover shadow-md
                        ${
                            isDragging
                                ? "border-yellow-200 transition-all duration-150"
                                : ""
                        }
                        ${isConverting ? "opacity-80 animate-pulse " : ""}
                    `}
                />
            ) : (
                <UserCircle
                    size={96}
                    className={`text-indigo-500 w-28 h-28
                    ${isDragging ? "text-indigo-700" : ""}
                    ${isConverting ? "animate-pulse text-indigo-600" : ""}
                    `}
                />
            )}

            <label
                htmlFor="avatar"
                className={`${
                    loading || isConverting ? "opacity-50" : ""
                } absolute bottom-2 right-1/2 -translate-x-7 bg-indigo-500 hover:bg-indigo-700 text-white p-1 dark:text-black rounded-full cursor-pointer transition`}
                title={t("auth.addAvatarTitle")}
            >
                <div className="relative w-6 h-6 z-1 text-white">
                    <Camera className="w-6 h-6 " />
                    <Plus className="w-3 h-3 absolute -top-0 -right-[3px] bg-indigo-400 rounded-full" />
                </div>
            </label>

            <input
                id="avatar"
                type="file"
                accept="image/*"
                readOnly={loading || isConverting}
                disabled={loading || isConverting}
                {...register("avatar", {
                    onChange: handleInputChange,
                })}
                className="hidden"
            />
        </div>
    );
};

export default UploadAvatar;
