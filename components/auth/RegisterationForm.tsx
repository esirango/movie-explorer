import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useRegister } from "../../pages/api/hooks/useAuth";
import Link from "next/link";
import AnimatedBackground from "../landing/AnimatedBackground";
import { useLanguage } from "../../lang/LanguageContext";
import Email from "./fields/Email";
import Password from "./fields/Password";
import Username from "./fields/Username";
import UploadAvatar from "./fields/UploadAvatar";
import useAuthStore from "../../store/useAuthStore";
import toast from "react-hot-toast";

interface RegisterFormInputs {
    email: string;
    password: string;
    username: string;
    avatar?: FileList;
}

const RegisterForm = () => {
    const router = useRouter();
    const { t } = useLanguage();

    const { token } = useAuthStore();

    useEffect(() => {
        if (token) {
            router.replace("/");
        }
    }, [token]);

    const { apiRegister, loading } = useRegister();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting, isValid },
    } = useForm<RegisterFormInputs>({
        mode: "onChange",
    });

    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: { target: { files: File[] } }) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const avatar = watch("avatar");

    useEffect(() => {
        if (avatar && avatar.length > 0) {
            const file = avatar[0];
            const url = URL.createObjectURL(file);
            setPreview(url);

            return () => URL.revokeObjectURL(url);
        } else {
            setPreview(null);
        }
    }, [avatar]);

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            await apiRegister(
                data.email,
                data.password,
                data.username,
                data.avatar
            );
            toast.success(t("auth.successInRegisterMsg"));
            router.push("/");
        } catch (error) {
            toast.error(
                error.response.data.msg
                    ? error.response.data.msg
                    : t("auth.errorInLoginMsg")
            );
        }
    };

    return (
        <div className="min-h-screen p-8 flex flex-col justify-center items-center bg-gradient-to-tr from-indigo-400 via-gray-100 to-gray-300 dark:bg-gradient-to-tr dark:from-indigo-900 dark:via-black dark:to-gray-900 px-4 transition-colors duration-300">
            <AnimatedBackground />
            <div className="bg-white z-20 dark:bg-gray-900 dark:bg-opacity-80 p-10 rounded-xl shadow-lg w-full max-w-md text-gray-800 dark:text-gray-200 transition-colors duration-300">
                <UploadAvatar
                    loading={loading}
                    t={t}
                    handleImageChange={handleImageChange}
                    register={register}
                    preview={preview}
                />

                <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-600 dark:text-indigo-400 tracking-wide">
                    {t("auth.registerTitle")}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Email
                        loading={loading}
                        t={t}
                        register={register}
                        errors={errors}
                    />

                    <Username
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
                                ? t("auth.registering")
                                : t("auth.register")}
                        </span>

                        {isValid && (
                            <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-white opacity-10 rotate-12 blur-lg animate-shine"></span>
                        )}
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                    {t("auth.alreadyRegister")}{" "}
                    <Link
                        href="/auth/login"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
                    >
                        {t("auth.loginOrder")}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;
