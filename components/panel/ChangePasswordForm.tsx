import React from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";

const ChangePasswordForm = () => {
    const { t } = useLanguage();
    const { register, handleSubmit, reset } = useForm();

    const onSubmit = (data: any) => {
        console.log("Password changed:", data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 shadow p-4 rounded"
        >
            <h3 className="text-lg font-bold mb-4">
                {t("panel.changePassword")}
            </h3>
            <input
                type="password"
                {...register("password", { required: true })}
                className="w-full mb-3 p-2 rounded border dark:bg-gray-700"
                placeholder={t("panel.newPassword") || ""}
            />
            <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded"
            >
                {t("panel.save")}
            </button>
        </form>
    );
};

export default ChangePasswordForm;
