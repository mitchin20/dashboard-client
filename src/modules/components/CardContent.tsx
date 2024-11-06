import React, { memo } from "react";
import { CardChildrenProps } from "../../types";

const CardContent: React.FC<CardChildrenProps> = ({
    children,
    className = "",
}) => {
    return <div className={`h-full p-4 ${className}`}>{children}</div>;
};

export default memo(CardContent);
