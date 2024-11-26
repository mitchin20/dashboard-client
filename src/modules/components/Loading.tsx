import React, { memo } from "react";

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <svg className="animate-spin w-16 h-16" viewBox="0 0 50 50">
                <circle
                    className="stroke-current text-white"
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    strokeWidth="5"
                    strokeDasharray="90, 30"
                    strokeDashoffset="0"
                />
            </svg>
        </div>
    );
};

export default memo(Loading);
