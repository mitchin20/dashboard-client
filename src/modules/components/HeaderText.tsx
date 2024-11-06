import React, { memo } from "react";
import { HeaderTextProps } from "../../types";

// Using React.memo can prevent unnecessary re-renders by memoizing the HeaderText component.
const HeaderText: React.FC<HeaderTextProps> = memo(
    ({ children, disableDivide, className, ...props }) => {
        // Add the line before and after the text
        return (
            <h4
                className={`text-center font-bold text-3xl pt-8 pb-8 z-1 ${disableDivide ? "" : "before:content-[''] before:w-[100px] before:h-px md:before:bg-black xxs:before:bg-white before:mr-4 before:inline-block after:content-[''] after:w-[100px] after:h-px md:after:bg-black xxs:after:bg-white after:ml-4 after:inline-block"}
                    ${className}
                `}
                {...props}
            >
                {children}
            </h4>
        );
    }
);

export default HeaderText;
