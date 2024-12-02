import React, { memo, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { menuItemStyles } from "../themes";
import BuildIcon from "../../../../svgIcons/BuildIcon";
import { ThemeContext } from "../../../../context/ThemeContext";
import GamesIcon from "../../../../svgIcons/GamesIcon";

interface SidebarMenuProps {
    collapsed?: boolean;
}

const menuItems = [
    {
        label: "States Data",
        to: "states-covid19",
    },
    {
        label: "County Data",
        to: "county-covid19",
    },
];

const menuItems2 = [
    {
        label: "Bingo",
        to: "bingo",
    },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed = false }) => {
    const { theme } = useContext(ThemeContext);
    return (
        <div className={`flex-grow overflow-y-auto`}>
            {/* <h6
                className={`text-xs text-left pl-4 my-4 font-semibold ${theme === "light" ? "text-sky-950" : "text-sky-50"}`}
            >
                General
            </h6> */}
            {/* <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                <MenuItem component={<RouterLink to="/admin-dashboard" />}>
                    <div className="pl-5">Comming Soon</div>
                </MenuItem>
            </Menu> */}
            {/* <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                <MenuItem component={<RouterLink to="/admin-dashboard" />}>
                    <div className="pl-5">Dashboard</div>
                </MenuItem>
            </Menu> */}

            {/* Sizebar Menu */}
            <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                <SubMenu
                    label="States/Counties Summary"
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
                {/* <h6
                    className={`text-xs text-left pl-4 my-4 font-semibold ${theme === "light" ? "text-sky-950" : "text-sky-50"}`}
                >
                    Extra
                </h6> */}
            </Menu>

            <Menu menuItemStyles={menuItemStyles(theme, collapsed)}>
                <SubMenu
                    label="Family Times"
                    icon={<GamesIcon className="h-6 w-6" />}
                >
                    {menuItems2 &&
                        menuItems2.map((item, index) => (
                            <MenuItem
                                key={index}
                                component={<RouterLink to={item.to} />}
                                className=""
                            >
                                {item.label}
                            </MenuItem>
                        ))}
                </SubMenu>
            </Menu>
        </div>
    );
};

export default memo(SidebarMenu);
