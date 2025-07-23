import React from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { useCurrentUser } from "../../pages/api/hooks/useAuth";
import AvatarSelector from "./AvatarSelector";
import UserInfoCard from "./UserInfoCard";
import ChangePasswordForm from "./ChangePasswordForm";
import { LoadingSpinner } from "../Loading";
import PanelError from "./PanelError";

const UserPanel = () => {
    const { user, isLoading, isError, mutate } = useCurrentUser();
    const { t } = useLanguage();

    if (!isLoading)
        return (
            <div className=" max-w-3xl min-h-[100vh] mx-auto text-gray-800 dark:text-gray-200 dark:bg-[#1f293f] bg-gray-200">
                <LoadingSpinner />
            </div>
        );
    if (isError || !user)
        return (
            <div className="p-6 max-w-3xl max-h-[100vh] mx-auto text-gray-800 dark:text-gray-200 dark:bg-[#1f293f] bg-gray-200">
                <PanelError retry={() => mutate()} />
            </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto text-gray-800 dark:text-gray-200 dark:bg-[#1f293f] bg-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-center">
                {t("panel.title")}
            </h2>
            <AvatarSelector currentAvatar={String(user.avatar)} />
            <UserInfoCard user={user} />
            <ChangePasswordForm />
        </div>
    );
};

export default UserPanel;
