import React from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";

const ChangePasswordForm = () => {
    const { t } = useLanguage();

    const { register, handleSubmit, reset, watch } = useForm();
    const newPassword = watch("password");
    const repeatPassword = watch("repeat");

    const onSubmit = (data) => {
        if (data.password !== data.repeat)
            return alert("Passwords do not match!");
        console.log("Password changed:", data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg space-y-4"
        >
            <h3 className="text-lg font-bold">{t("panel.changePassword")}</h3>
            <input
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 rounded border dark:bg-gray-700"
                placeholder={t("panel.newPassword") || ""}
            />
            <input
                type="password"
                {...register("repeat", { required: true })}
                className="w-full p-2 rounded border dark:bg-gray-700"
                placeholder={t("panel.repeatPassword") || ""}
            />
            <div className="text-end">
                <button type="submit" className="btn-primary">
                    {t("panel.save")}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
