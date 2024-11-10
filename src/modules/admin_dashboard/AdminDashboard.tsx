import React, { lazy, useState } from "react";
import MenuIcon from "../../svgIcons/MenuIcon";
import { Outlet } from "react-router-dom";
import Layout from "./layouts/Layout";
import LightThemeIcon from "../../svgIcons/LightThemeIcon";
import DarkThemeIcon from "../../svgIcons/DarkThemeIcon";

const CustomSidebar = lazy(() => import("./components/CustomSidebar"));

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
            <main className={`w-full overflow-hidden p-3 bg-cyan-900`}>
                <div
                    className={`flex ${broken ? "justify-end" : "justify-start"} gap-4`}
                >
                    {broken ? (
                        <button onClick={() => setToggled(!toggled)}>
                            <MenuIcon className="w-6 h-6 text-white" />
                        </button>
                    ) : (
                        <button onClick={handleCollapseSidebar}>
                            <MenuIcon className="w-6 h-6 text-white" />
                        </button>
                    )}
                    {theme === "dark" ? (
                        <button
                            key="dark"
                            onClick={handleThemeChange}
                            className="animate-slideIn"
                        >
                            <LightThemeIcon className="w-6 h-6 text-white" />
                        </button>
                    ) : (
                        <button
                            key="light"
                            onClick={handleThemeChange}
                            className="animate-slideIn"
                        >
                            <DarkThemeIcon className="w-6 h-6 text-white" />
                        </button>
                    )}
                </div>
                <div>
                    <Outlet />
                </div>
            </main>
        </Layout>
    );
};

export default AdminDashboard;
