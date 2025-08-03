import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLanguage } from "../../lang/LanguageContext";
import PasswordToggle from "../auth/fields/PasswordToggle";
import { useUpdatePassword } from "../../pages/api/hooks/useUpdatePassword";
import toast from "react-hot-toast";

interface ChangePasswordInputs {
    password: string;
    confirm: string;
}

const ChangePasswordForm = () => {
    const { t } = useLanguage();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<ChangePasswordInputs>({
        mode: "onChange",
    });

    const newPassword = watch("password");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { updatePassword, loading, error } = useUpdatePassword();

    const onSubmit = async (data: ChangePasswordInputs) => {
        try {
            await updatePassword({
                newPassword: data.password,
                confirmPassword: data.confirm,
            });
            toast.success(t("panel.toastMessages.passwordUpdated"));
            reset();
        } catch (e: any) {
            toast.error(e?.response?.data?.msg || "Error updating password");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white w-full dark:bg-gray-800 shadow-md p-6 rounded-lg space-y-4"
            noValidate
        >
            <h3 className="text-lg font-bold">{t("panel.changePassword")}</h3>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                        required:
                            t("panel.errors.required") ||
                            "Password is required",
                        minLength: {
                            value: 6,
                            message:
                                t("panel.errors.passwordMinLength") ||
                                "Password must be at least 6 characters",
                        },
                    })}
                    className={`w-full py-2 px-5 rounded border dark:bg-gray-700 ${
                        errors.password ? "border-red-500" : ""
                    }`}
                    placeholder={t("panel.newPassword") || ""}
                />
                <PasswordToggle
                    visible={showPassword}
                    toggle={() => setShowPassword((prev) => !prev)}
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <div className="relative">
                <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirm", {
                        required:
                            t("panel.errors.required") ||
                            "Please confirm password",
                        validate: (value) =>
                            value === newPassword ||
                            t("panel.errors.passwordsMismatch") ||
                            "Passwords do not match",
                    })}
                    className={`w-full py-2 px-5 rounded border dark:bg-gray-700 ${
                        errors.confirm ? "border-red-500" : ""
                    }`}
                    placeholder={t("panel.confirmPassword") || ""}
                />
                <PasswordToggle
                    visible={showConfirm}
                    toggle={() => setShowConfirm((prev) => !prev)}
                />
                {errors.confirm && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirm.message}
                    </p>
                )}
            </div>

            <div className="text-end">
                <button
                    type="submit"
                    disabled={!isValid || isSubmitting || loading}
                    className={`btn-primary ${
                        !isValid || isSubmitting || loading
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                >
                    {loading || isSubmitting
                        ? t("loading.title")
                        : t("panel.save")}
                </button>
            </div>
        </form>
    );
};

export default ChangePasswordForm;
