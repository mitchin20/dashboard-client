import "../Home.css";
import React, { useRef } from "react";

const textStyle = "font-semibold italic";

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);

    const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        const heroElement = heroRef.current;
        if (!heroElement) return;

        // Define the number of ripples per click
        const numRipples = 5;

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
        <section
            ref={heroRef}
            onClick={createRipple}
            className="relative h-screen flex items-center justify-center bg-white overflow-hidden"
        >
            <div className="container mx-auto px-4 py-8 h-[80vh] flex flex-col justify-center">
                <h1 className="w-6/12 ml-auto mr-auto text-5xl font-bold text-center gradient-text-1 p-5">
                    Hello, I'm Giang
                </h1>
                <p className="w-6/12 ml-auto mr-auto text-2xl text-center leading-10 mt-10">
                    I'm a full-stack developer with 5 years of experience. I
                    enjoy building{" "}
                    <span className="inline-block whitespace-nowrap text-2xl font-bold italic gradient-text-1">
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
        </section>
    );
};

export default Hero;
