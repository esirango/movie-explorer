import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";
import { Eye, EyeOff } from "lucide-react";
import PasswordToggle from "../auth/fields/PasswordToggle";

const ChangePasswordForm = () => {
    const { t } = useLanguage();

    const { register, handleSubmit, reset, watch } = useForm();
    const newPassword = watch("password");
    const confirmPassword = watch("confirm");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const onSubmit = (data: any) => {
        if (data.password !== data.confirm)
            return alert("Passwords do not match!");
        console.log("Password changed:", data);
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-full dark:bg-gray-800 shadow-md p-6 rounded-lg space-y-4"
        >
            <h3 className="text-lg font-bold">{t("panel.changePassword")}</h3>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    className="w-full py-2 px-5 rounded border dark:bg-gray-700 "
                    placeholder={t("panel.newPassword") || ""}
                />
                <PasswordToggle
                    visible={showPassword}
                    toggle={() => setShowPassword((prev) => !prev)}
                />
            </div>

            <div className="relative">
                <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirm", { required: true })}
                    className="w-full py-2 px-5 rounded border dark:bg-gray-700 "
                    placeholder={t("panel.confirmPassword") || ""}
                />
                <PasswordToggle
                    visible={showConfirm}
                    toggle={() => setShowConfirm((prev) => !prev)}
                />
            </div>

            <div className="text-end">
                <button type="submit" className="btn-primary">
                    {t("panel.save")}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
