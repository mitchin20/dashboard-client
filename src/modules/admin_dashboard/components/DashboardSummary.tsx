import React, { lazy, useContext } from "react";
import { DashboardSummaryProps } from "../../../types";
import RecentVisited from "./dashboard_components/RecentVisited";
import { ThemeContext } from "../../../context/ThemeContext";
import LoadingIcon2 from "../../../svgIcons/LoadingIcon2";

const Section1 = lazy(() => import("./dashboard_components/Section1"));
const Section2 = lazy(() => import("./dashboard_components/Section2"));

const DashboardSummary: React.FC<DashboardSummaryProps> = () => {
    const { theme } = useContext(ThemeContext);
    const textColor = theme === "dark" ? "text-white" : "text-sky-950";
    return (
        <div className={`mt-5 ${textColor}`}>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="p-4 rounded-lg bg-gray-400 flex items-center justify-center">
                    <LoadingIcon2 className="w-20 h-20 animate-spin" />
                </div>
                <Section1 />
                <Section2 />
            </div>
            <RecentVisited />
        </div>
    );
};

export default DashboardSummary;
