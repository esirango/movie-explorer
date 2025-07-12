import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { login } from "../../pages/api/hooks/useAuth";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>();

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            await login(data.email, data.password);
            router.push("/"); // بعد از ورود موفق به صفحه اصلی بره
        } catch (error) {
            alert("خطا در ورود، لطفا دوباره تلاش کنید");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50 dark:bg-gray-900">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    ورود
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

                <label className="block mb-4">
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

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
                >
                    ورود
                </button>

                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    حساب کاربری نداری؟{" "}
                    <a
                        href="/register"
                        className="text-indigo-600 hover:underline"
                    >
                        ثبت نام کن
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginPage;
