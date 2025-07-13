import React from "react";

function Email({ t, register, errors, loading }) {
    return (
        <label className="block mb-4">
            <span className="text-sm font-semibold mb-1 block">
                {t("auth.fields.email")}
            </span>
            <input
                type="email"
                placeholder="example@cinema.com"
                readOnly={loading}
                {...register("email", {
                    required: t("auth.fields.requiredEmailMsg"),
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: t("auth.fields.formatEmailMsg"),
                    },
                })}
                className={`w-full rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 border ${
                    errors.email
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700 focus:border-indigo-500"
                } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition`}
            />
            {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                </p>
            )}
        </label>
    );
}

export default Email;
