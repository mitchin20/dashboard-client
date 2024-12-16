import React, { memo, useContext } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Tooltip from "../../../components/Tooltip";
import AddIcon from "../../../../svgIcons/AddIcon";

const Category = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <div>
            <div className="flex justify-between mb-5">
                <h1
                    className={`text-lg ${theme === "dark" ? "text-white" : "text-emerald-900"} font-semibold`}
                >
                    Category tags
                </h1>
                <Tooltip content="Create new category tag" position="left">
                    <button
                        type="button"
                        className="shadow-md shadow-gray-500 rounded-lg"
                    >
                        <AddIcon className="w-7 h-7" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default memo(Category);
