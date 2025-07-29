import React, { useState } from "react";
import PasswordToggle from "./PasswordToggle";

function Password({ t, register, errors, loading }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <label className="block mb-4">
            <span className="text-sm font-semibold mb-1 block">
                {t("auth.fields.password")}
            </span>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="******"
                    readOnly={loading}
                    {...register("password", {
                        required: t("auth.fields.requiredPasswordMsg"),
                        minLength: {
                            value: 6,
                            message: t("auth.fields.formatPasswordMsg"),
                        },
                    })}
                    className={`w-full rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 border ${
                        errors.password
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-700 focus:border-indigo-500"
                    } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition`}
                />
                <PasswordToggle
                    visible={showPassword}
                    toggle={() => setShowPassword((prev) => !prev)}
                />
            </div>
            {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                </p>
            )}
        </label>
    );
}

export default Password;
