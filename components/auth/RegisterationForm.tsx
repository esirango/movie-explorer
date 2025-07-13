import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { register as apiRegister } from "../../pages/api/hooks/useAuth";
import { UserCircle } from "lucide-react";

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
        <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-900 via-black to-gray-900 px-4">
            <div className="bg-gray-900 bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-md text-gray-200">
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
                <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-400 tracking-wide">
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
                            className={`w-full rounded px-3 py-2 bg-gray-800 border ${
                                errors.email
                                    ? "border-red-500"
                                    : "border-gray-700 focus:border-indigo-500"
                            } text-gray-100 placeholder-gray-400 transition`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </label>

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
                            className={`w-full rounded px-3 py-2 bg-gray-800 border ${
                                errors.username
                                    ? "border-red-500"
                                    : "border-gray-700 focus:border-indigo-500"
                            } text-gray-100 placeholder-gray-400 transition`}
                        />
                        {errors.username && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.username.message}
                            </p>
                        )}
                    </label>

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
                            className={`w-full rounded px-3 py-2 bg-gray-800 border ${
                                errors.password
                                    ? "border-red-500"
                                    : "border-gray-700 focus:border-indigo-500"
                            } text-gray-100 placeholder-gray-400 transition`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </label>

                    <label className="block mb-6">
                        <span className="text-sm font-semibold mb-1 block">
                            عکس پروفایل (اختیاری)
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("profilePicture")}
                            className="w-full rounded bg-gray-800 border border-gray-700 text-gray-200 p-2 cursor-pointer focus:outline-none focus:border-indigo-500"
                        />
                    </label>

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-full py-3 rounded text-lg font-bold text-white transition ${
                            isValid
                                ? "bg-indigo-600 hover:bg-indigo-700"
                                : "bg-indigo-400 cursor-not-allowed"
                        }`}
                    >
                        {isSubmitting ? "در حال ثبت نام..." : "ثبت نام"}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-400 text-sm">
                    قبلا ثبت نام کردی؟{" "}
                    <a
                        href="/login"
                        className="text-indigo-500 hover:underline font-semibold"
                    >
                        وارد شو
                    </a>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
