import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";
import { useUpdateUsername } from "../../pages/api/hooks/useUpdateUsername";
import toast from "react-hot-toast";

interface Props {
    user: {
        username: string;
        email: string;
    };
}

const UserInfoCard = ({ user }: Props) => {
    const { t } = useLanguage();
    const [isEditing, setIsEditing] = useState(false);
    const [localUsername, setLocalUsername] = useState(user.username);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: { username: localUsername },
    });

    useEffect(() => {
        reset({ username: localUsername });
    }, [localUsername, reset]);

    const { updateUsername, loading, error } = useUpdateUsername();

    const onSubmit = async (data: { username: string }) => {
        try {
            await updateUsername(data.username);
            toast.success(t("panel.toastMessages.usernameUpdated"));
            setLocalUsername(data.username);
            setIsEditing(false);
        } catch (e: any) {
            toast.error(e.response.data.msg);
            setIsEditing(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full">
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
                            {localUsername}
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
                            <button
                                type="submit"
                                className="btn-primary"
                                style={loading ? { opacity: 0.5 } : {}}
                                disabled={loading}
                            >
                                {loading ? t("loading.title") : t("panel.save")}
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    reset({ username: localUsername });
                                    setIsEditing(false);
                                }}
                                className="btn-secondary"
                            >
                                {t("panel.cancel")}
                            </button>
                        </>
                    ) : (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsEditing(true);
                            }}
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
