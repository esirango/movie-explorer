import React from "react";

function Username({ t, register, errors, loading }) {
    return (
        <label className="block mb-4">
            <span className="text-sm font-semibold mb-1 block">
                {t("auth.fields.username")}
            </span>
            <input
                type="text"
                readOnly={loading}
                placeholder={t("auth.fields.usernamePlaceholder")}
                {...register("username", {
                    required: t("auth.fields.requiredUsernameMsg"),
                    minLength: {
                        value: 3,
                        message: t("auth.fields.formatUsernameMsg"),
                    },
                })}
                className={`w-full rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 border ${
                    errors.username
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700 focus:border-indigo-500"
                } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition`}
            />
            {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                    {errors.username.message}
                </p>
            )}
        </label>
    );
}

export default Username;
