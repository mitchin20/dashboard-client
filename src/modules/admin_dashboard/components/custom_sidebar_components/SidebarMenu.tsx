import React, { memo, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { menuItemStyles } from "../themes";
import BuildIcon from "../../../../svgIcons/BuildIcon";
import { ThemeContext } from "../../../../context/ThemeContext";

interface SidebarMenuProps {
    collapsed?: boolean;
}

const menuItems = [
    {
        label: "States Data",
        to: "covid19",
    },
];

const SidebarMenu: React.FC<SidebarMenuProps> = ({ collapsed = false }) => {
    const { theme } = useContext(ThemeContext);
    return (
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
                <MenuItem component={<RouterLink to="/admin-dashboard" />}>
                    <div className="pl-5">Dashboard</div>
                </MenuItem>
            </Menu>

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
                <h6
                    className={`text-xs text-left pl-4 my-4 font-semibold ${theme === "light" ? "text-sky-950" : "text-sky-50"}`}
                >
                    Extra
                </h6>
            </Menu>
        </div>
    );
};

export default memo(SidebarMenu);
