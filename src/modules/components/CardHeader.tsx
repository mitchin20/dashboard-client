import React, { memo } from "react";
import { CardChildrenProps } from "../../types";

const CardHeader: React.FC<CardChildrenProps> = ({
    children,
    className = "",
}) => {
    return (
        <div
            className={`text-xl font-bold p-4 border-b border-gray-200 ${className}`}
        >
            {children}
        </div>
    );
};

export default memo(CardHeader);
