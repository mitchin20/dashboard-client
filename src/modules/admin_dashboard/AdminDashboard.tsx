import React, { lazy, SetStateAction, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import MenuIcon from "../../svgIcons/MenuIcon";
// import Switch from "@mui/material/Switch";

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
    // const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
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
        <div className={`flex min-h-screen transform duration-1000`}>
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
                    className={`flex ${broken ? "justify-end" : "justify-start"}`}
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
                </div>
                <div>
                    <button onClick={handleThemeChange}>Theme</button>
                </div>
                {/* I want the content of each menu Item to be display in this main area */}
                <div>
                    <Routes>
                        <Route path="/covid19" element={<div>Covid19</div>} />
                        <Route path="/weather" element={<div>Weather</div>} />
                        <Route path="/charts" element={<div>Charts</div>} />
                    </Routes>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
