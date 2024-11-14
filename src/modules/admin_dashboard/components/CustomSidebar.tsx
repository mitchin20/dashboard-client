import React, { lazy, memo, SetStateAction, useContext } from "react";
import { Sidebar, SidebarProps } from "react-pro-sidebar";
import { themes } from "./themes";
import { ThemeContext } from "../../../context/ThemeContext";

const SidebarHeader = lazy(
    () => import("./custom_sidebar_components/SidebarHeader")
);
const SidebarMenu = lazy(
    () => import("./custom_sidebar_components/SidebarMenu")
);
const SidebarFooter = lazy(
    () => import("./custom_sidebar_components/SidebarFooter")
);

interface CustomSidebarProps extends SidebarProps {
    collapsed?: boolean;
    broken?: boolean;
    setToggled?: React.Dispatch<SetStateAction<boolean>> | undefined;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({
    collapsed = false,
    toggled,
    broken,
    setToggled,
    onBreakPoint,
}) => {
    const { theme } = useContext(ThemeContext);
    const getTextColorClass = (theme: string) =>
        theme === "dark" ? "text-white" : "text-emerald-700";

    return (
        <Sidebar
            collapsed={collapsed}
            toggled={toggled}
            breakPoint="md"
            onBreakPoint={onBreakPoint}
            onBackdropClick={() => setToggled && setToggled(false)}
            backgroundColor={themes[theme].sidebar.backgroundColor}
            rootStyles={{
                color: themes[theme].sidebar.color,
                borderRightWidth: "1px",
                borderRightStyle: "solid",
                borderRightColor: themes[theme].sidebar.borderRightColor,
                boxShadow: "0 0 10px rgba(0, 0, 0, 1)",
            }}
        >
            <div className="flex flex-col h-full">
                {/* Sizebar Header */}
                <SidebarHeader
                    collapsed={collapsed}
                    theme={theme}
                    themeColor={getTextColorClass(theme)}
                    broken={broken}
                    setToggled={setToggled}
                />

                {/* Menu Items */}
                <SidebarMenu collapsed={collapsed} />

                {/* Sidebar Footer */}
                <SidebarFooter collapsed={collapsed} />
            </div>
        </Sidebar>
    );
};

export default memo(CustomSidebar);
