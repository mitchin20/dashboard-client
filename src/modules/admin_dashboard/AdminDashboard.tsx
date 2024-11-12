import React, { lazy, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./layouts/Layout";
import { getTheme, setNewTheme } from "../../helpers/theme";
import { ThemeContext } from "../../context/ThemeContext";

const CustomSidebar = lazy(() => import("./components/CustomSidebar"));
const MainHeader = lazy(() => import("./components/MainHeader"));

type Theme = "light" | "dark";

const menuItems = [
    {
        label: "Covid 19",
        to: "covid19",
    },
    {
        label: "Weather",
        to: "weather",
    },
];

const AdminDashboard = () => {
    const { theme } = useContext(ThemeContext);
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [toggled, setToggled] = useState<boolean>(true);
    const [broken, setBroken] = useState<boolean>(false);

    const handleCollapseSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    return (
        <Layout>
            <CustomSidebar
                collapsed={collapsed}
                toggled={toggled}
                menuItems={menuItems}
                broken={broken}
                setToggled={setToggled}
                onBreakPoint={setBroken}
            />
            <main
                className={`w-full overflow-y-scroll p-3 ${theme === "dark" ? "bg-cyan-900" : "bg-white"}`}
            >
                {/* Main header */}
                <MainHeader
                    toggled={toggled}
                    broken={broken}
                    setToggled={setToggled}
                    handleCollapseSidebar={handleCollapseSidebar}
                />

                {/* Main content */}
                <div>
                    <Outlet />
                </div>
            </main>
        </Layout>
    );
};

export default AdminDashboard;
