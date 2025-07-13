import { PlusCircle, UserCircle } from "lucide-react";
import React from "react";

function UploadAvatar({ preview, loading, t, register, handleImageChange }) {
    return (
        <div className="relative flex justify-center mb-6">
            {preview ? (
                <img
                    src={preview}
                    alt={t("auth.previewAvatarAlt")}
                    className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
                />
            ) : (
                <UserCircle size={96} className="text-indigo-500" />
            )}

            <label
                htmlFor="avatar"
                className="absolute bottom-[-5px] left-[140px] bg-indigo-500 hover:bg-indigo-700 text-white p-0.5  dark:text-black  rounded-full cursor-pointer transition"
                title={t("auth.addAvatarTitle")}
            >
                <PlusCircle className="w-6 h-6 " />
            </label>

            <input
                id="avatar"
                type="file"
                accept="image/*"
                readOnly={loading}
                disabled={loading}
                {...register("avatar", {
                    onChange: (e: { target: { files: any[] } }) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const url = URL.createObjectURL(file);
                            handleImageChange(e);
                        }
                    },
                })}
                className="hidden"
            />
        </div>
    );
}

export default UploadAvatar;
