import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { login } from "../../pages/api/hooks/useAuth";
import Link from "next/link";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm<LoginFormInputs>({
        mode: "onChange",
    });

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data.email, data.password);
            router.push("/");
        } catch (error) {
            alert("خطا در ورود، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-400 via-gray-100 to-gray-300 dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-black dark:to-gray-900 px-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900 dark:bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-md text-gray-800 dark:text-gray-200 transition-colors duration-300">
                <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
                    ورود به دنیای سینما
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    {/* ایمیل */}
                    <label className="block mb-4">
                        <span className="text-sm font-semibold mb-1 block">
                            ایمیل
                        </span>
                        <input
                            type="email"
                            placeholder="example@cinema.com"
                            {...register("email", {
                                required: "ایمیل ضروری است",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "فرمت ایمیل معتبر نیست",
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

                    {/* رمز عبور */}
                    <label className="block mb-6">
                        <span className="text-sm font-semibold mb-1 block">
                            رمز عبور
                        </span>
                        <input
                            type="password"
                            placeholder="رمز عبور خود را وارد کنید"
                            {...register("password", {
                                required: "رمز عبور ضروری است",
                                minLength: {
                                    value: 6,
                                    message: "حداقل ۶ کاراکتر وارد کنید",
                                },
                            })}
                            className={`w-full rounded px-3 py-2 bg-gray-100 dark:bg-gray-800 border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-700 focus:border-indigo-500"
                            } text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </label>

                    {/* دکمه ارسال */}
                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-full py-3 text-center rounded text-lg font-bold text-white transition ${
                            isValid
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "bg-indigo-400 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? "در حال ورود..." : "ورود"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    حساب کاربری نداری؟{" "}
                    <Link
                        href="/auth/register"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                        ثبت نام کن
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
