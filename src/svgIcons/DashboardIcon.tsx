import React from "react";

interface DashboardIconProps {
    className?: string;
}

const DashboardIcon: React.FC<DashboardIconProps> = ({ className }) => {
    return (
        <svg
            fill="#000000"
            viewBox="0 0 24 24"
            id="dashboard"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                id="secondary"
                d="M21,7V4a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1V7a1,1,0,0,0,1,1h5A1,1,0,0,0,21,7ZM10,20V17a1,1,0,0,0-1-1H4a1,1,0,0,0-1,1v3a1,1,0,0,0,1,1H9A1,1,0,0,0,10,20Z"
                fill="none"
                stroke="rgb(44, 169, 188)"
                // stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
            <path
                id="primary"
                d="M9,12H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H9a1,1,0,0,1,1,1v7A1,1,0,0,1,9,12Zm12,8V13a1,1,0,0,0-1-1H15a1,1,0,0,0-1,1v7a1,1,0,0,0,1,1h5A1,1,0,0,0,21,20Z"
                fill="none"
                // stroke="rgb(0, 0, 0)"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
        </svg>
    );
};

export default DashboardIcon;
