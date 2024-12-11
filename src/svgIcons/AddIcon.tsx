import React, { memo } from "react";

interface AddIconProps {
    className?: string;
}

const AddIcon: React.FC<AddIconProps> = ({ className }) => {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
            <defs>
                <linearGradient id="repeating-linear-gradient">
                    <stop offset="0%" stopColor="#FFA07A" />
                    <stop offset="25%" stopColor="#FFC107" />
                    <stop offset="50%" stopColor="#FF69B4" />
                    <stop offset="75%" stopColor="#8B9467" />
                    <stop offset="100%" stopColor="#FFC67D" />
                </linearGradient>
            </defs>
            <path
                d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
                stroke="url(#repeating-linear-gradient)"
                strokeWidth="1.5"
                strokeLinecap="round"
            />
            <path
                d="M22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C21.5093 4.43821 21.8356 5.80655 21.9449 8"
                stroke="url(#repeating-linear-gradient)"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default memo(AddIcon);