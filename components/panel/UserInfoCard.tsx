import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";

interface Props {
    user: {
        username: string;
        email: string;
    };
}

const UserInfoCard = ({ user }: Props) => {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit } = useForm({
        defaultValues: { username: user.username },
    });

    const onSubmit = (data: { username: string }) => {
        // ارسال به API

        console.log("Username updated to:", data.username);
        // setIsEditing(false);
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow p-4 rounded mb-6 w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block font-semibold mb-1">
                        {t("panel.username")}
                    </label>
                    {isEditing ? (
                        <input
                            {...register("username", { required: true })}
                            className="w-full p-2 rounded border dark:bg-gray-700"
                        />
                    ) : (
                        <p>{user.username}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block font-semibold mb-1">
                        {t("panel.email")}
                    </label>
                    <p>{user.email}</p>
                </div>

                <div className="flex justify-end space-x-2 gap-4">
                    {isEditing ? (
                        <>
                            <button type="submit" className="text-blue-600">
                                {t("panel.save")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="gray-red-600"
                            >
                                {t("panel.cancel")}
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="text-blue-600"
                        >
                            {t("panel.edit")}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default UserInfoCard;
