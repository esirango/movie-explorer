import React, { useEffect, useState } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { useCurrentUser } from "../../pages/api/hooks/useAuth";
import AvatarSelector from "./AvatarSelector";
import UserInfoCard from "./UserInfoCard";
import ChangePasswordForm from "./ChangePasswordForm";
import { LoadingSpinner } from "../Loading";
import GenericError from "../error/GenericError";
import AnimatedBackground from "../landing/AnimatedBackground";
import FavoriteMovies from "./FavoriteMovies";
import useAuthStore from "../../store/useAuthStore";

const UserPanel = () => {
    const [isClient, setIsClient] = useState(false);
    const { user, isLoading, isError } = useCurrentUser();
    const { t } = useLanguage();

    const { token } = useAuthStore();

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
                <div className="z-[2] flex flex-col items-center lg:w-1/2 w-full gap-y-6">
                    <AvatarSelector currentAvatar={String(user.avatar)} />
                    <UserInfoCard user={user} />
                    <ChangePasswordForm />
                    <FavoriteMovies userId={user._id} userToken={token} />
                </div>
            </div>
        </>
    );
};

export default UserPanel;
