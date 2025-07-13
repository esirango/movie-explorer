import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { register as apiRegister } from "../../pages/api/hooks/useAuth";
import { UserCircle } from "lucide-react";
import Link from "next/link";

interface RegisterFormInputs {
    email: string;
    password: string;
    username: string;
    profilePicture?: FileList;
}

const RegisterForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<RegisterFormInputs>({
        mode: "onChange",
    });

    const [preview, setPreview] = useState<string | null>(null);

    const profilePicture = watch("profilePicture");

    useEffect(() => {
        if (profilePicture && profilePicture.length > 0) {
            const file = profilePicture[0];
            const url = URL.createObjectURL(file);
            setPreview(url);

            return () => URL.revokeObjectURL(url);
        } else {
            setPreview(null);
        }
    }, [profilePicture]);

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            await apiRegister(data.email, data.password);
            router.push("/login");
        } catch (error) {
            alert("خطا در ثبت نام، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-400 via-gray-100 to-gray-300 dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-black dark:to-gray-900 px-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-900 dark:bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-md text-gray-800 dark:text-gray-200 transition-colors duration-300">
                <div className="flex justify-center mb-6">
                    {preview ? (
                        <img
                            src={preview}
                            alt="پیش‌نمایش عکس پروفایل"
                            className="w-24 h-24 rounded-full border-4 border-indigo-500 object-cover"
                        />
                    ) : (
                        <UserCircle size={96} className="text-indigo-500" />
                    )}
                </div>
                <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
                    ثبت نام در سینماپلکس
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

                    {/* Username */}
                    <label className="block mb-4">
                        <span className="text-sm font-semibold mb-1 block">
                            نام کاربری
                        </span>
                        <input
                            type="text"
                            placeholder="نام کاربری شما"
                            {...register("username", {
                                required: "نام کاربری ضروری است",
                                minLength: {
                                    value: 3,
                                    message: "حداقل ۳ کاراکتر وارد کنید",
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

                    {/* Password */}
                    <label className="block mb-4">
                        <span className="text-sm font-semibold mb-1 block">
                            رمز عبور
                        </span>
                        <input
                            type="password"
                            placeholder="رمز عبور قوی انتخاب کنید"
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

                    {/* Profile Picture */}
                    <label className="block mb-6">
                        <span className="text-sm font-semibold mb-1 block">
                            عکس پروفایل (اختیاری)
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("profilePicture")}
                            className="w-full rounded bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 p-2 cursor-pointer focus:outline-none focus:border-indigo-500 transition"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`relative overflow-hidden w-full py-3 rounded-xl text-center text-lg font-bold text-white transition-all duration-300 ease-in-out
    ${
        isValid
            ? "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl hover:scale-[1.02] active:scale-95 cursor-pointer"
            : "bg-indigo-400 cursor-not-allowed"
    }
    ${isValid ? "animate-pulse-once" : ""}
  `}
                    >
                        <span className="relative z-10">
                            {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
                        </span>

                        {isValid && (
                            <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 blur-lg animate-shine"></span>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    قبلا ثبت نام کردی؟{" "}
                    <Link
                        href="/auth/login"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                        وارد شو
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
