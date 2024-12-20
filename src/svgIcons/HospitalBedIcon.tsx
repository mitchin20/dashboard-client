import React from "react";

interface HospitalBedIconProps {
    className?: string;
}

const HospitalBedIcon: React.FC<HospitalBedIconProps> = ({ className }) => {
    return (
        <svg
            fill="none"
            viewBox="0 0 32 32"
            id="icon"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                stroke="currentColor"
                d="M25,16H17a2.0023,2.0023,0,0,0-2,2v6H4V14H2V30H4V26H28v4h2V21A5.0059,5.0059,0,0,0,25,16Zm3,8H17V18h8a3.0033,3.0033,0,0,1,3,3Z"
            />
            <path
                stroke="currentColor"
                d="M9.5,17A1.5,1.5,0,1,1,8,18.5,1.5017,1.5017,0,0,1,9.5,17m0-2A3.5,3.5,0,1,0,13,18.5,3.5,3.5,0,0,0,9.5,15Z"
            />
            <polygon
                stroke="currentColor"
                points="21 6 17 6 17 2 15 2 15 6 11 6 11 8 15 8 15 12 17 12 17 8 21 8 21 6"
            />
            <rect id="_Transparent_Rectangle_" width="32" height="32" />
        </svg>
    );
};

export default HospitalBedIcon;
