import { lazy, useEffect } from "react";
import { setRecentPageVisited } from "../../../helpers/recentPageVisited";

const DashboardSummary = lazy(() => import("../components/DashboardSummary"));

const DefaultAdminDashboard = () => {
    useEffect(() => {
        const currentPath = window.location.pathname;
        setRecentPageVisited("recentPageVisited", {
            name: "Admin Dashboard",
            url: currentPath,
        });
    }, []);
    return <DashboardSummary />;
};

export default DefaultAdminDashboard;
