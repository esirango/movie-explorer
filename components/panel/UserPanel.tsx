import React, { useEffect, useState } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { useCurrentUser } from "../../pages/api/hooks/useAuth";
import AvatarSelector from "./AvatarSelector";
import UserInfoCard from "./UserInfoCard";
import ChangePasswordForm from "./ChangePasswordForm";
import { LoadingSpinner } from "../Loading";
import GenericError from "../error/GenericError";
import AnimatedBackground from "../landing/AnimatedBackground";

const UserPanel = () => {
    const [isClient, setIsClient] = useState(false);
    const { user, isLoading, isError, mutate } = useCurrentUser();
    const { t } = useLanguage();

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }

    if (isLoading)
        return (
            <div
                className="flex items-center justify-center h-screen
                    bg-gray-200 dark:bg-[#1f293f] text-gray-800 dark:text-gray-200"
            >
                <LoadingSpinner />
            </div>
        );

    if (isError || !user)
        return (
            <div
                className="flex items-center justify-center h-screen
                    bg-gray-200 dark:bg-[#1f293f] text-gray-800 dark:text-gray-200"
            >
                <GenericError
                    title={t("panel.panelTitle")}
                    message={t("panel.panelMessage")}
                />
            </div>
        );

    return (
        <>
            <div className="p-6 w-full mx-auto flex flex-col items-center gap-8 text-gray-800 dark:text-gray-200 dark:bg-[#1f293f] bg-gray-100">
                <AnimatedBackground />
                <h2 className="text-3xl font-extrabold text-center">
                    {t("panel.title")}
                </h2>
                <div className="z-[2] flex flex-col items-center w-1/2 gap-y-6">
                    <AvatarSelector currentAvatar={String(user.avatar)} />
                    <UserInfoCard user={user} />
                    <ChangePasswordForm />
                </div>
            </div>
        </>
    );
};

export default UserPanel;
