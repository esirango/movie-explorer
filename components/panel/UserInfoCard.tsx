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
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block font-semibold mb-1">
                        {t("panel.username")}
                    </label>
                    {isEditing ? (
                        <input
                            {...register("username", { required: true })}
                            className="w-full p-2 rounded border focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700"
                        />
                    ) : (
                        <p className="text-gray-600 dark:text-gray-300">
                            {user.username}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block font-semibold mb-1">
                        {t("panel.email")}
                    </label>
                    <p className="text-gray-600 dark:text-gray-300">
                        {user.email}
                    </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    {isEditing ? (
                        <>
                            <button type="submit" className="btn-primary">
                                {t("panel.save")}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="btn-secondary"
                            >
                                {t("panel.cancel")}
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="btn-primary"
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
