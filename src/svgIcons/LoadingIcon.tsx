import React, { memo } from "react";

interface LoadingIconProps {
    className?: string;
}

const LoadingIcon: React.FC<LoadingIconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            viewBox="0 0 100 100"
            className={className}
        >
            <circle cx="20" cy="50" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="35" cy="35" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.1s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="50" cy="20" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.2s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="65" cy="35" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.3s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="80" cy="50" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.4s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="65" cy="65" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.5s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="50" cy="80" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.6s"
                    repeatCount="indefinite"
                />
            </circle>
            <circle cx="35" cy="65" r="5" fill="#999">
                <animate
                    attributeName="opacity"
                    from="1"
                    to="0"
                    dur="1s"
                    begin="0.7s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    );
};

export default memo(LoadingIcon);
