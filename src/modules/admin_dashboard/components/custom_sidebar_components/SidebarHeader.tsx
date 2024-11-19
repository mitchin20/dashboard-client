import React, { memo } from "react";
import { Link as RouterLink } from "react-router-dom";
import PathIcon from "../../../../svgIcons/PathIcon";
import Tooltip from "../../../components/Tooltip";
import LandingPageIcon from "../../../../svgIcons/LandingPageIcon";
import DashboardIcon from "../../../../svgIcons/DashboardIcon";
import MenuIcon from "../../../../svgIcons/MenuIcon";

interface SidebarHeaderProps {
    collapsed?: boolean;
    theme?: string;
    themeColor?: string;
    broken?: boolean;
    toggled?: boolean;
    setToggled: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
    collapsed,
    theme,
    themeColor,
    broken,
    setToggled,
}) => {
    return (
        <div
            className={`sticky top-0 z-50 border-b-[1px] border-solid ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"}`}
        >
            <div
                className={`flex items-center justify-center ${themeColor} mx-auto my-16`}
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
                        <LandingPageIcon className={`w-6 h-6 ${themeColor}`} />
                    </RouterLink>
                </Tooltip>
                <Tooltip content="Dashboard">
                    <RouterLink to="/admin-dashboard">
                        <DashboardIcon className={`w-6 h-6 ${themeColor}`} />
                    </RouterLink>
                </Tooltip>
                {broken && (
                    <Tooltip content="Close Sidebar">
                        <button onClick={() => setToggled && setToggled(false)}>
                            <MenuIcon className={`w-6 h-6 ${themeColor}`} />
                        </button>
                    </Tooltip>
                )}
            </div>
        </div>
    );
};

export default memo(SidebarHeader);
