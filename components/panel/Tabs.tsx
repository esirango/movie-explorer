import React, { useState, useEffect } from "react";
import { useLanguage } from "../../lang/LanguageContext";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Tabs = ({ tabs, onTabChange }) => {
    const { t } = useLanguage();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    // وقتی صفحه لود میشه از query یا localStorage تب رو بخونه
    useEffect(() => {
        const queryTab = router.query.tab;
        const storedTab = localStorage.getItem("activeUserPanelTab");

        if (
            queryTab &&
            tabs.some((tab: { id: string | string[] }) => tab.id === queryTab)
        ) {
            setActiveTab(queryTab);
            onTabChange(queryTab);
        } else if (
            storedTab &&
            tabs.some((tab: { id: string }) => tab.id === storedTab)
        ) {
            setActiveTab(storedTab);
            onTabChange(storedTab);
        }
    }, [router.query.tab, tabs, onTabChange]);

    const handleTabClick = (id: string) => {
        setActiveTab(id);
        onTabChange(id);
        localStorage.setItem("activeUserPanelTab", id);
        router.replace(
            { pathname: router.pathname, query: { ...router.query, tab: id } },
            undefined,
            { shallow: true }
        );
    };

    return (
        <div className="w-full flex flex-col items-center relative">
            <div className="flex lg:flex-row md:flex-row flex-col lg:w-4/6 md:w-5/6 sm:w-4/6  w-full items-center justify-evenly  gap-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-md p-2 rounded-xl shadow-md">
                {tabs.map((tab: { id: string; label: string }) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.id)}
                            className={`relative px-5 py-2 rounded-lg font-medium transition-all duration-300 text-center lg:text-lg text-lg
                                ${
                                    isActive
                                        ? "text-white bg-indigo-500 shadow-lg"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                                }`}
                        >
                            {t(tab.label)}
                            {isActive && (
                                <motion.div
                                    layoutId="activeTabIndicator"
                                    className="absolute inset-0 rounded-lg bg-indigo-500 -z-10"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Tabs;
