import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

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
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormInputs>();

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            // اگر میخوای پروفایل عکس اپلود کنی باید جدا روش آپلود بذاری و url عکس رو بفرستی به API
            // فعلاً فقط ایمیل، پسورد و یوزرنیم میفرستیم

            await (data.email, data.password); // اگه API تو اینا رو قبول می‌کنه
            router.push("/login");
        } catch (error) {
            alert("خطا در ثبت نام، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    ثبت نام
                </h2>

                <label className="block mb-2">
                    ایمیل
                    <input
                        type="email"
                        {...register("email", { required: "ایمیل ضروری است" })}
                        className="mt-1 w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </label>

                <label className="block mb-2">
                    نام کاربری
                    <input
                        type="text"
                        {...register("username", {
                            required: "نام کاربری ضروری است",
                        })}
                        className="mt-1 w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.username.message}
                        </p>
                    )}
                </label>

                <label className="block mb-2">
                    رمز عبور
                    <input
                        type="password"
                        {...register("password", {
                            required: "رمز عبور ضروری است",
                        })}
                        className="mt-1 w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                </label>

                <label className="block mb-4">
                    عکس پروفایل (اختیاری)
                    <input
                        type="file"
                        accept="image/*"
                        {...register("profilePicture")}
                        className="mt-1 w-full rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700 p-2"
                    />
                </label>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
                >
                    ثبت نام
                </button>

                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    قبلا ثبت نام کردی؟{" "}
                    <a
                        href="/login"
                        className="text-indigo-600 hover:underline"
                    >
                        وارد شو
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
