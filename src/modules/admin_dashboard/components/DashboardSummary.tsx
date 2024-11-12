import React, { lazy } from "react";
import { DashboardSummaryProps } from "../../../types";
import RecentVisited from "./dashboard_components/RecentVisited";

const Section1 = lazy(() => import("./dashboard_components/Section1"));
const Section2 = lazy(() => import("./dashboard_components/Section2"));

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ theme }) => {
    const textColor = theme === "dark" ? "text-white" : "text-sky-950";
    return (
        <div className={`mt-5 ${textColor}`}>
            <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-5">
                <Section1 />
                <Section2 />
            </div>
            <RecentVisited />
        </div>
    );
};

export default DashboardSummary;
