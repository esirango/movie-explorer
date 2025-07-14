import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useLogin } from "../../pages/api/hooks/useAuth";
import Link from "next/link";
import AnimatedBackground from "../landing/AnimatedBackground";
import { useLanguage } from "../../lang/LanguageContext";
import Email from "./fields/Email";
import Password from "./fields/Password";
import useAuthStore from "../../store/useAuthStore";

interface LoginFormInputs {
    email: string;
    password: string;
}

const LoginPage = () => {
    const router = useRouter();
    const { t } = useLanguage();

    const { token } = useAuthStore();

    useEffect(() => {
        if (token) {
            router.replace("/");
        }
    }, [token]);

    const { login, loading } = useLogin();

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
            alert(error?.response?.data?.msg);
        }
    };

    return (
        <div className="min-h-screen p-8 flex flex-col  justify-center items-center bg-gradient-to-tr from-indigo-400 via-gray-100 to-gray-300 dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-black dark:to-gray-900 px-4 transition-colors duration-300">
            <AnimatedBackground />
            <div className="bg-white z-20 dark:bg-gray-900 dark:bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-md text-gray-800 dark:text-gray-200 transition-colors duration-300">
                <h2 className="text-3xl  font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
                    {t("auth.loginTitle")}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Email
                        loading={loading}
                        t={t}
                        register={register}
                        errors={errors}
                    />

                    <Password
                        loading={loading}
                        t={t}
                        register={register}
                        errors={errors}
                    />

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
                            {isSubmitting
                                ? t("auth.loggingIn")
                                : t("auth.login")}
                        </span>

                        {isValid && (
                            <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 blur-lg animate-shine"></span>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    {t("auth.noAccount")}{" "}
                    <Link
                        href="/auth/register"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                        {t("auth.registerOrder")}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
