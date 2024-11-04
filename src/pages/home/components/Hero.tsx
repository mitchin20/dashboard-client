import "../Home.css";
import React, { useRef } from "react";

const textStyle = "font-semibold italic";

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const heroElement = heroRef.current;
        if (!heroElement) return;

        // Define the number of ripples per click
        const numRipples = 3;

        // Loop to create multiple ripples
        for (let i = 0; i < numRipples; i++) {
            const ripple = document.createElement("span");
            const diameter = Math.max(
                heroElement.clientWidth,
                heroElement.clientHeight
            );
            const radius = diameter / 2;

            // Set position and size for the ripple
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${e.clientX - heroElement.getBoundingClientRect().left - radius}px`;
            ripple.style.top = `${e.clientY - heroElement.getBoundingClientRect().top - radius}px`;

            // Apply the ripple class
            ripple.classList.add("ripple");

            // Apply different animation durations for each ripple to create a delay effect
            ripple.style.animationDuration = `${1.2 + i * 0.5}s`; // e.g., 1.2s, 1.7s, 2.2s

            // Append the ripple to the hero section
            heroElement.appendChild(ripple);

            // Remove the ripple after the animation ends
            requestAnimationFrame(() => {
                ripple.addEventListener("animationend", () => {
                    ripple.remove();
                });
            });
        }
    };

    return (
        <div
            ref={heroRef}
            id="hero"
            onClick={createRipple}
            className="relative h-[66vh] flex items-center justify-center bg-white overflow-hidden"
        >
            <div className="lg:w-1/2 md:w-3/4 xxs:w-full text-center mx-auto py-8 flex flex-col justify-center xxs:p-[10px] xs:p-2">
                <h1 className="ml-auto mr-auto xs:text-4xl xxs:text-3xl font-bold gradient-text-1 pt-5 pb-5">
                    Hello, I'm Giang
                </h1>
                <p className="text-2xl xxs:text-base xs:text-lg leading-10 mt-10">
                    I'm a full-stack developer with 5 years of experience. I
                    enjoy building{" "}
                    <span className="font-bold italic gradient-text-1">
                        websites & applications,
                    </span>{" "}
                    concentrating primarily on{" "}
                    <span className={`gradient-text-2 ${textStyle}`}>
                        Node.js
                    </span>
                    ,{" "}
                    <span className={`gradient-text-2 ${textStyle}`}>
                        React
                    </span>{" "}
                    and its framework,{" "}
                    <span className={`gradient-text-0 ${textStyle}`}>
                        NextJS.
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Hero;
