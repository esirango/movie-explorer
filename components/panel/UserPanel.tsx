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
import Tabs from "./Tabs";
import { motion, AnimatePresence } from "framer-motion";

const UserPanel = () => {
    const { user, isLoading, isError } = useCurrentUser();
    const { t } = useLanguage();
    const { token } = useAuthStore();

    const [activeTab, setActiveTab] = useState("info");
    const [isClient, setIsClient] = useState(false);

    const tabItems = [
        { id: "info", label: "panel.tabs.info" },
        { id: "password", label: "panel.tabs.password" },
        { id: "favorites", label: "panel.tabs.favorites" },
    ];

    const fadeVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    };

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
        <div className="p-6 w-full mx-auto flex flex-col items-center gap-8 text-gray-800 dark:text-gray-200 dark:bg-[#1f293f] bg-gray-100">
            <AnimatedBackground />
            <h2 className="text-3xl font-extrabold text-center">
                {t("panel.title")}
            </h2>

            <Tabs tabs={tabItems} onTabChange={setActiveTab} />

            <div className="z-[2] flex flex-col items-center lg:w-1/2 w-full gap-y-6">
                <AnimatePresence mode="wait">
                    {activeTab === "info" && (
                        <motion.div
                            key="info"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full flex flex-col items-center gap-y-6"
                        >
                            <AvatarSelector
                                currentAvatar={String(user.avatar)}
                            />
                            <UserInfoCard user={user} />
                        </motion.div>
                    )}
                    {activeTab === "password" && (
                        <motion.div
                            key="password"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full"
                        >
                            <ChangePasswordForm />
                        </motion.div>
                    )}
                    {activeTab === "favorites" && (
                        <motion.div
                            key="favorites"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="w-full"
                        >
                            <FavoriteMovies
                                userId={user._id}
                                userToken={token}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
export default UserPanel;
