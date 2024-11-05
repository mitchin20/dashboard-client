import React, { memo } from "react";
import { ButtonProps } from "../../types";

const Button: React.FC<ButtonProps> = ({
    text,
    type = "button",
    className,
    startIcon,
    endIcon,
    onClick,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center justify-center gap-2 p-4 border-solid border-2 border-gray-400 shadow-md transform duration-500 ${className}`}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {text || "New Button"}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </button>
    );
};

export default memo(Button);
