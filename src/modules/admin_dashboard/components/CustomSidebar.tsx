import React, { lazy, memo, SetStateAction } from "react";
import { Sidebar, MenuItem, SidebarProps } from "react-pro-sidebar";
import { themes } from "./themes";

const SidebarHeader = lazy(
    () => import("./custom_sidebar_components/SidebarHeader")
);
const SidebarMenu = lazy(
    () => import("./custom_sidebar_components/SidebarMenu")
);
const SidebarFooter = lazy(
    () => import("./custom_sidebar_components/SidebarFooter")
);

type MenuItem = {
    label: string;
    to: string;
};

interface CustomSidebarProps extends SidebarProps {
    menuItems?: MenuItem[];
    collapsed?: boolean;
    theme?: "light" | "dark";
    broken?: boolean;
    setToggled?: React.Dispatch<SetStateAction<boolean>> | undefined;
}

const CustomSidebar: React.FC<CustomSidebarProps> = ({
    collapsed = false,
    menuItems,
    theme = "dark",
    toggled,
    broken,
    setToggled,
    onBreakPoint,
}) => {
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
                <SidebarMenu
                    collapsed={collapsed}
                    theme={theme}
                    menuItems={menuItems}
                />

                {/* Sidebar Footer */}
                <SidebarFooter collapsed={collapsed} theme={theme} />
            </div>
        </Sidebar>
    );
};

export default memo(CustomSidebar);
