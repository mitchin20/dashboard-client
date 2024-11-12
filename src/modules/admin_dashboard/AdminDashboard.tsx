import React, { lazy, useState } from "react";
import { Outlet } from "react-router-dom";
import Layout from "./layouts/Layout";

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
    const [collapsed, setCollapsed] = useState<boolean>(false);
    const [theme, setTheme] = React.useState<Theme>("light");
    const [toggled, setToggled] = useState<boolean>(true);
    const [broken, setBroken] = useState<boolean>(false);

    const handleCollapseSidebar = () => {
        setCollapsed((prev) => !prev);
    };

    // handle on theme change event
    const handleThemeChange = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    };

    return (
        <Layout>
            <CustomSidebar
                collapsed={collapsed}
                theme={theme}
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
                    theme={theme}
                    broken={broken}
                    setToggled={setToggled}
                    handleCollapseSidebar={handleCollapseSidebar}
                    handleThemeChange={handleThemeChange}
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
