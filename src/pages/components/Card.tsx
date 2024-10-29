import React, { memo } from "react";
import { CardProps } from "../../types";

// Using React.memo can prevent unnecessary re-renders by memoizing the Card component.
const Card: React.FC<CardProps> = memo(
    ({
        children,
        cardContainerStyles,
        disableSpinAnimation,
        cardContentStyles,
    }) => {
        return (
            <div
                className={`relative lg:w-[50%] md:w-[60%] xxs:w-[95%] h-[400px] xxs:h-[500px] rounded-[10px] overflow-hidden before:absolute shadow-2xl shadow-slate-900 before:top-[-100%] before:right-[-100%] before:bottom-[-100%] before:left-[-100%] before:bg-gradient-conic ${disableSpinAnimation ? "" : "before:animate-spin"} ${cardContainerStyles}`}
            >
                <div
                    className={`absolute flex flex-col text-center justify-center align-middle top-[2px] right-[2px] bottom-[2px] left-[2px] px-4 md:bg-white md:text-black xxs:bg-gray-800 xxs:text-white rounded-[10px] transition duration-1000 ${cardContentStyles}`}
                >
                    {children}
                </div>
            </div>
        );
    }
);

export default Card;
