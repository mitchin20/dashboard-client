import React, { memo } from "react";
import MenuIcon from "../../../svgIcons/MenuIcon";
import LightThemeIcon from "../../../svgIcons/LightThemeIcon";
import DarkThemeIcon from "../../../svgIcons/DarkThemeIcon";
import NotificationIcon from "../../../svgIcons/NotificationIcon";
import SearchIcon from "../../../svgIcons/SearchIcon";

interface MainHeaderProps {
    broken: boolean;
    theme: string;
    toggled: boolean;
    handleCollapseSidebar: () => void;
    handleThemeChange: () => void;
    setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainHeader: React.FC<MainHeaderProps> = ({
    toggled,
    theme,
    broken,
    setToggled,
    handleCollapseSidebar,
    handleThemeChange,
}) => {
    const iconColor = theme === "dark" ? "text-white" : "text-black";
    return (
        <header
            className={`sticky top-0 z-50 bg-gray-400 p-2 rounded-full align-middle items-center ${broken ? "flex justify-self-end gap-4" : "grid grid-cols-2 gap-2"}`}
        >
            <div
                className={`${!broken ? "grid justify-items-start" : "flex items-center"}`}
            >
                {broken ? (
                    <button onClick={() => setToggled(!toggled)}>
                        <MenuIcon className={`w-6 h-6 ${iconColor}`} />
                    </button>
                ) : (
                    <button onClick={handleCollapseSidebar}>
                        <MenuIcon className={`w-6 h-6 ${iconColor}`} />
                    </button>
                )}
            </div>

            <div className={`${!broken && "grid justify-items-end"}`}>
                <div className="flex gap-3">
                    <SearchIcon className={`w-6 h-6 ${iconColor}`} />
                    <NotificationIcon className={`w-6 h-6 ${iconColor}`} />
                    {theme === "dark" ? (
                        <button
                            key="dark"
                            onClick={handleThemeChange}
                            className="animate-slideIn"
                        >
                            <LightThemeIcon
                                className={`w-6 h-6 ${iconColor}`}
                            />
                        </button>
                    ) : (
                        <button
                            key="light"
                            onClick={handleThemeChange}
                            className="animate-slideIn"
                        >
                            <DarkThemeIcon className={`w-6 h-6 ${iconColor}`} />
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default memo(MainHeader);
