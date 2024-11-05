import React from "react";

interface BuildIconProps {
    className?: string;
}

const BuildIcon: React.FC<BuildIconProps> = ({ className }) => {
    return (
        <svg
            version="1.1"
            id="Uploaded to svgrepo.com"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            className={className}
        >
            <path
                fill="currentColor"
                d="M29,20c0-0.552-0.448-1-1-1h-3c-0.552,0-1,0.448-1,1v1h-1v-1c0-0.552-0.448-1-1-1h-3 c-0.552,0-1,0.448-1,1v1h-1V6c0-0.552-0.448-1-1-1l0,0V4c0-0.552-0.448-1-1-1h-3c-0.552,0-1,0.448-1,1v1l0,0c-0.552,0-1,0.448-1,1v7 H9v-1c0-0.552-0.448-1-1-1H5c-0.552,0-1,0.448-1,1v1H3c-0.552,0-1,0.448-1,1v15c0,0.552,0.448,1,1,1h26c0.552,0,1-0.448,1-1v-7 c0-0.552-0.448-1-1-1V20z M25,20h3v1h-3V20z M19,20h3v1h-3V20z M12,4h3v1h-3V4z M11,6h5v7h-5V6z M5,12h3v1H5V12z M3,14h13v7H3V14z M29,29H3v-7h26V29z"
            />
        </svg>
    );
};

export default BuildIcon;
