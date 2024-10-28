import React from "react";
import { DesktopNavProps } from "../../../../types";

const DesktopNav: React.FC<DesktopNavProps> = ({ isView, navItems }) => {
    return (
        <div
            className={`hidden w-full md:flex md:items-center md:space-x-6 space-y-4 md:space-y-0 md:w-auto mt-4 md:mt-0`}
        >
            {navItems.map((item, index) => (
                <a
                    key={index}
                    href={item.href}
                    className="text-gray-700 font-medium hover:text-[#082f49] hover:scale-150 px-4 py-4 rounded-xl transition-transform duration-200 ease-in-out"
                >
                    {item.label}
                </a>
            ))}
        </div>
    );
};

export default DesktopNav;
