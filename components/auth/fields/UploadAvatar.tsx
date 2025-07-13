import { PlusCircle, UserCircle } from "lucide-react";
import React from "react";

function UploadAvatar({ preview, t, register, handleImageChange }) {
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
                htmlFor="profilePicture"
                className="absolute bottom-[-5px] left-[140px] bg-indigo-500 hover:bg-indigo-700 text-white p-0.5  dark:text-black  rounded-full cursor-pointer transition"
                title={t("auth.addAvatarTitle")}
            >
                <PlusCircle className="w-6 h-6 " />
            </label>

            <input
                id="profilePicture"
                type="file"
                accept="image/*"
                {...register("profilePicture")}
                className="hidden"
                onChange={handleImageChange}
            />
        </div>
    );
}

export default UploadAvatar;
