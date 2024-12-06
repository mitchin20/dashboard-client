import React, { memo } from "react";

interface Loading2Props {
    className?: string;
}

const LoadingIcon2: React.FC<Loading2Props> = ({ className }) => {
    const colors = [
        "#FAFAFA", // Zinc 50 (Lightest)
        "#F4F4F5", // Zinc 100
        "#E4E4E7", // Zinc 200
        "#D4D4D8", // Zinc 300
        "#A1A1AA", // Zinc 400
        "#71717A", // Zinc 500 (Mid-tone)
        "#52525B", // Zinc 600
        "#3F3F46", // Zinc 700
        "#27272A", // Zinc 800
        "#18181B", // Zinc 900
        "#121212", // Zinc 950 (Very Dark)
        "#0A0A0A", // Zinc Black (Darkest)
    ];

    return (
        <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 496"
            className={className}
        >
            {/* Define each dot with its own color */}
            <circle fill={colors[0]} cx="248" cy="24" r="24">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0s"
                    repeatCount="indefinite"
                />
            </circle>

            <path
                fill={colors[1]}
                d="M339.2,41.6c6.4-11.2,20.8-15.2,32.8-8.8c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8 C336.8,68,332.8,53.6,339.2,41.6z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.125s"
                    repeatCount="indefinite"
                />
            </path>

            <path
                fill={colors[2]}
                d="M430.4,115.2c11.2-6.4,25.6-2.4,32.8,8.8c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8 C415.2,136.8,419.2,121.6,430.4,115.2z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.25s"
                    repeatCount="indefinite"
                />
            </path>

            <circle fill={colors[3]} cx="472" cy="248" r="24">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.375s"
                    repeatCount="indefinite"
                />
            </circle>

            <path
                fill={colors[4]}
                d="M454.4,339.2c11.2,6.4,15.2,20.8,8.8,32.8 c-6.4,11.2-20.8,15.2-32.8,8.8c-11.2-6.4-15.2-20.8-8.8-32.8C428,336.8,442.4,332.8,454.4,339.2z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.5s"
                    repeatCount="indefinite"
                />
            </path>

            <path
                fill={colors[5]}
                d="M380.8,430.4c6.4,11.2,2.4,25.6-8.8,32.8 c-11.2,6.4-25.6,2.4-32.8-8.8c-6.4-11.2-2.4-25.6,8.8-32.8C359.2,415.2,374.4,419.2,380.8,430.4z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.625s"
                    repeatCount="indefinite"
                />
            </path>

            <circle fill={colors[6]} cx="248" cy="472" r="24">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.75s"
                    repeatCount="indefinite"
                />
            </circle>

            <path
                fill={colors[7]}
                d="M115.2,430.4c6.4-11.2,20.8-15.2,32.8-8.8 c11.2,6.4,15.2,20.8,8.8,32.8c-6.4,11.2-20.8,15.2-32.8,8.8C112.8,456,108.8,441.6,115.2,430.4z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="0.875s"
                    repeatCount="indefinite"
                />
            </path>

            <path
                fill={colors[8]}
                d="M41.6,339.2c11.2-6.4,25.6-2.4,32.8,8.8 c6.4,11.2,2.4,25.6-8.8,32.8c-11.2,6.4-25.6,2.4-32.8-8.8S30.4,346.4,41.6,339.2z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="1s"
                    repeatCount="indefinite"
                />
            </path>

            <circle fill={colors[9]} cx="24" cy="248" r="24">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="1.125s"
                    repeatCount="indefinite"
                />
            </circle>

            <path
                fill={colors[10]}
                d="M65.6,115.2c11.2,6.4,15.2,20.8,8.8,32.8 c-6.4,11.2-20.8,15.2-32.8,8.8c-11.2-6.4-15.2-20.8-8.8-32.8S54.4,108.8,65.6,115.2z"
            >
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="1.25s"
                    repeatCount="indefinite"
                />
            </path>

            <circle fill={colors[11]} cx="136" cy="53.6" r="24">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.5s"
                    begin="1.375s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

export default memo(LoadingIcon2);
