import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";
import PasswordToggle from "../auth/fields/PasswordToggle";
import { useUpdatePassword } from "../../pages/api/hooks/useUpdatePassword";
import toast from "react-hot-toast";

const ChangePasswordForm = () => {
    const { t } = useLanguage();

    const { register, handleSubmit, reset, watch } = useForm();
    const newPassword = watch("password");
    const confirmPassword = watch("confirm");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { updatePassword, loading, error } = useUpdatePassword();

    const onSubmit = async (data: any) => {
        try {
            await updatePassword({
                newPassword: data.password,
                confirmPassword: data.confirm,
            });
            toast.success(t("panel.toastMessages.passwordUpdated"));
            reset();
        } catch (e) {
            toast.error(e.response.data.msg);
        }
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
                <button
                    type="submit"
                    className="btn-primary"
                    style={loading ? { opacity: 0.5 } : {}}
                >
                    {loading ? t("loading.title") : t("panel.save")}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
