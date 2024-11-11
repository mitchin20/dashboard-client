import React, { memo, SetStateAction, useEffect, useState } from "react";
import {
    Sidebar,
    Menu,
    MenuItem,
    SidebarProps,
    SubMenu,
} from "react-pro-sidebar";
import { Link as RouterLink } from "react-router-dom";
import { themes, menuItemStyles } from "./themes";
import BuildIcon from "../../../svgIcons/BuildIcon";
import PathIcon from "../../../svgIcons/PathIcon";
import MenuIcon from "../../../svgIcons/MenuIcon";
import GitHubIcon from "../../../svgIcons/GitHubIcon";
import Card2 from "../../components/Card2";
import CardContent from "../../components/CardContent";
import Link from "../../components/Link";
import LandingPageIcon from "../../../svgIcons/LandingPageIcon";
import DashboardIcon from "../../../svgIcons/DashboardIcon";
import Tooltip from "../../components/Tooltip";

const GITHUB_URL = "https://github.com/mitchin20/dashboard-client";

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
                <div
                    className={`sticky top-0 z-50 border-b-[1px] border-solid ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"}`}
                >
                    <div
                        className={`flex items-center justify-center ${getTextColorClass(theme)} mx-auto my-16`}
                    >
                        <PathIcon
                            className={`${collapsed ? "h-10 w-10" : "h-10 w-h-10"}`}
                        />
                        <h1
                            className={`font-bold text-sm transform duration-1000 transition-all ${collapsed ? "opacity-0 max-w-0 overflow-hidden" : "ml-2 opacity-100 max-w-full"}`}
                        >
                            A<span className="font-thin">DMIN</span> D
                            <span className="font-thin">ashboard</span>
                        </h1>
                    </div>

                    <div className="flex justify-center gap-4 mb-4">
                        <Tooltip content="Landing Page">
                            <RouterLink to="/">
                                <LandingPageIcon
                                    className={`w-6 h-6 ${getTextColorClass(theme)}`}
                                />
                            </RouterLink>
                        </Tooltip>
                        <Tooltip content="Menu">
                            <RouterLink to="/admin-dashboard">
                                <DashboardIcon
                                    className={`w-6 h-6 ${getTextColorClass(theme)}`}
                                />
                            </RouterLink>
                        </Tooltip>
                        {broken && (
                            <Tooltip content="Close Sidebar">
                                <button
                                    onClick={() =>
                                        setToggled && setToggled(false)
                                    }
                                >
                                    <MenuIcon
                                        className={`w-6 h-6 ${getTextColorClass(theme)}`}
                                    />
                                </button>
                            </Tooltip>
                        )}
                    </div>
                </div>

                {/* Menu Items */}
                <div className={`flex-grow overflow-y-auto`}>
                    <h6
                        className={`text-xs text-left pl-4 my-4 font-semibold ${theme === "light" ? "text-sky-950" : "text-sky-50"}`}
                    >
                        General
                    </h6>
                    <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                        <MenuItem component={<RouterLink to="/" />}>
                            <div className="pl-5">Landing Page</div>
                        </MenuItem>
                    </Menu>
                    <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                        <MenuItem
                            component={<RouterLink to="/admin-dashboard" />}
                        >
                            <div className="pl-5">Dashboard</div>
                        </MenuItem>
                    </Menu>

                    {/* Sizebar Menu */}
                    <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                        <SubMenu
                            label="Covid/Weather"
                            icon={<BuildIcon className="h-6 w-6" />}
                        >
                            {menuItems &&
                                menuItems.map((item, index) => (
                                    <MenuItem
                                        key={index}
                                        component={<RouterLink to={item.to} />}
                                        className=""
                                    >
                                        {item.label}
                                    </MenuItem>
                                ))}
                        </SubMenu>
                        <h6
                            className={`text-xs text-left pl-4 my-4 font-semibold ${theme === "light" ? "text-sky-950" : "text-sky-50"}`}
                        >
                            Extra
                        </h6>
                    </Menu>
                </div>

                {/* Sidebar Footer */}
                <div
                    className={`sticky bottom-0 z-50 ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"} ${collapsed ? "p-5" : "p-10"} border-t-[1px] border-solid`}
                >
                    {collapsed ? (
                        <div className="flex justify-center h-auto">
                            <Link href={GITHUB_URL} target="_blank">
                                <GitHubIcon
                                    className={`h-12 w-12 ${theme === "dark" ? "text-white" : "text-black"}`}
                                />
                            </Link>
                        </div>
                    ) : (
                        <div className="h-auto w-full text-white">
                            <Card2
                                slideEffect
                                className="relative h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-200%] hover:before:animate-spin before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px]"
                            >
                                <div
                                    className={`relative h-full z-1 bg-gray-500 hover:bg-gray-400 hover:text-white xxs:hover:text-lg xs:hover:text-lg rounded-[10px] p-2 transition duration-500`}
                                >
                                    <CardContent
                                        className={`flex flex-col justify-center items-center text-center`}
                                    >
                                        <GitHubIcon className="h-12 w-12" />
                                        <p className="italic text-xs my-5">
                                            GitHub repository
                                        </p>
                                        <Link
                                            href={GITHUB_URL}
                                            target="_blank"
                                            className="no-underline text-white text-sm border-solid border-2 border-gray-600 p-2 hover:text-gray-600 hover:bg-white-gradient-conic rounded-full shadow-sm hover:shadow-black transform duration-700 ease-in-out"
                                        >
                                            View Code
                                        </Link>
                                    </CardContent>
                                </div>
                            </Card2>
                        </div>
                    )}
                </div>
            </div>
        </Sidebar>
    );
};

export default memo(CustomSidebar);
