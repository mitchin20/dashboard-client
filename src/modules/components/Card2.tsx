import React, { forwardRef, memo, useEffect, useRef, useState } from "react";
import { CardProps } from "../../types";

// The Card container component
const Card: React.FC<CardProps> = forwardRef<HTMLDivElement, CardProps>(
    ({ children, slideEffect, className = "" }, ref) => {
        const [isVisible, setIsVisible] = useState<boolean>(false);
        const cardRef = useRef<HTMLDivElement | null>(null);

        // Ensure the ref used by the observer is passed correctly
        const mergedRef = (node: HTMLDivElement) => {
            cardRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        };

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
        }, []);

        const slide = slideEffect
            ? isVisible
                ? "animate-slideIn"
                : "opacity-0 translate-x-0"
            : "";

        return (
            <div
                ref={mergedRef}
                className={`relative rounded-[10px] overflow-hidden shadow-2xl shadow-slate-900 ${slide} ${className}`}
            >
                {children}
            </div>
        );
    }
);

export default memo(Card);
