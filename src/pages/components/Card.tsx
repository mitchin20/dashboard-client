import React, { memo, useEffect, useRef, useState } from "react";
import { CardProps } from "../../types";

// Using React.memo can prevent unnecessary re-renders by memoizing the Card component.
const Card: React.FC<CardProps> = memo(
    ({
        children,
        width = "w-[300px]",
        height = "w-[300px]",
        cardContainerStyles,
        disableSpinAnimation,
        cardContentStyles,
        slideEffect,
    }) => {
        const [isVisible, setIsVisible] = useState<boolean>(false);
        const cardRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            setIsVisible(true);
                            // observer.unobserve(entry.target);
                        } else if (entry.intersectionRatio === 0) {
                            setIsVisible(false);
                        }
                    });
                },
                { threshold: [0, 0.1] } // Trigger when fully out (0) and 10% in view (0.1)
            );

            if (cardRef.current) {
                observer.observe(cardRef.current);
            }

            return () => {
                if (cardRef.current) {
                    observer.unobserve(cardRef.current);
                }
            };
        }, [isVisible]);

        // Define container and content styles separately for readability
        // relative rounded-[10px] overflow-hidden before:absolute before:top-[-100%] before:right-[-100%] before:bottom-[-100%] before:left-[-100%] before:bg-gradient-conic before:animate-spin
        const slide = `${slideEffect ? (isVisible ? "animate-slideIn" : "opacity-0 translate-x-0") : ""}`;
        const containerClasses = `
                relative ${width} ${height} rounded-[10px] overflow-hidden 
                shadow-2xl shadow-slate-900 before:absolute before:top-[-100%] before:right-[-100%] 
                before:bottom-[-100%] before:left-[-100%] before:bg-gradient-conic 
                ${disableSpinAnimation ? "" : "before:animate-spin"} ${cardContainerStyles} ${slide}
            `;

        const contentClasses = `
                absolute flex flex-col text-center justify-center align-middle top-[2px] 
                right-[2px] bottom-[2px] left-[2px] px-4 bg-white text-black
                rounded-[10px] transition duration-1000 ${cardContentStyles}
            `;
        return (
            <div ref={cardRef} className={containerClasses}>
                <div className={contentClasses}>{children}</div>
            </div>
        );
    }
);

export default Card;
