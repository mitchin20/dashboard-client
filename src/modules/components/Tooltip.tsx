import React, { useState } from "react";
import { TooltipProps } from "../../types";

const Tooltip: React.FC<TooltipProps> = ({
    content,
    children,
    position = "top",
    delay = 0,
    className = "",
    arrowClassName = "",
}) => {
    const [visible, setVisible] = useState(false);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    // Show the tooltip with an optional delay
    const handleMouseEnter = () => {
        const showTimer = setTimeout(() => {
            setVisible(true);
        }, delay);
        setTimer(showTimer);
    };

    // Hide the tooltip and clear any timer
    const handleMouseLeave = () => {
        if (timer) {
            clearTimeout(timer);
        }
        setVisible(false);
    };

    // Tooltip position classes
    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
        right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
        bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
        left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
    };

    // Arrow position classes (positioned outside of the tooltip content)
    const arrowPositionClasses = {
        top: "-bottom-2 left-1/2 transform -translate-x-1/2 border-t-gray-500",
        right: "-left-2 top-1/2 transform -translate-y-1/2 border-r-gray-500",
        bottom: "-top-2 left-1/2 transform -translate-x-1/2 border-b-gray-500",
        left: "-right-2 top-1/2 transform -translate-y-1/2 border-l-gray-500",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {visible && (
                <div
                    className={`absolute whitespace-nowrap bg-gray-500 text-white text-sm px-3 py-1 rounded shadow-lg ${positionClasses[position]} ${className} z-50`}
                    role="tooltip"
                >
                    {content}
                    {/* Arrow Element */}
                    <div
                        className={`absolute w-0 h-0 border-4 border-transparent ${arrowPositionClasses[position]} ${arrowClassName}`}
                    />
                </div>
            )}
        </div>
    );
};

export default Tooltip;
