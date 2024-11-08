import "../Home.css";
import React, { useRef } from "react";
import Button from "../../components/Button";
import DownloadIcon from "../../../svgIcons/DownloadIcon";
import BuildIcon from "../../../svgIcons/BuildIcon";
import axios from "axios";
import {
    setSessionStorage,
    getSessionStorage,
} from "../../../helpers/sessionStorage";
import Link from "../../components/Link";

export interface DownloadResponse {
    success: boolean;
    url?: string;
    error?: string;
    message: string;
}

const ttl = 24 * 60 * 60 * 1000;
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

    const fetchData = async () => {
        const cachedData = getSessionStorage("download-url");
        if (cachedData) {
            const link = document.createElement("a");
            link.href = cachedData;
            link.download = "resume.pdf";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.click();
            return;
        }

        try {
            const response = await axios.get<DownloadResponse>(
                `${process.env.REACT_APP_SERVER_URL}/download-resume`
            );
            if (!response.data.success) {
                console.error(
                    response.data.message || "Failed to fetch the download URL."
                );
            } else {
                setSessionStorage("download-url", response.data.url, ttl);
                const link = document.createElement("a");
                link.href = response.data.url || "";
                link.download = "resume.pdf";
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.click();
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div
            ref={heroRef}
            id="hero"
            onClick={createRipple}
            className="relative h-[66vh] flex items-center justify-center bg-white overflow-hidden"
        >
            <div className="lg:w-1/2 md:w-3/4 xxs:w-full text-center mx-auto py-8 flex flex-col justify-center items-center xxs:p-[10px] xs:p-2">
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

                <Button
                    text="Download CV"
                    onClick={fetchData}
                    endIcon={<DownloadIcon className="w-6 h-6 text-gray-600" />}
                    className="text-gray-900 font-thin mt-14 w-1/3 xxs:w-3/4 xs:w-[200px] rounded-bl-[60px] rounded-tl-2xl rounded-tr-[50px] rounded-br-xl shadow-lg shadow-slate-600 hover:rounded-tl-[50px] hover:rounded-bl-xl hover:rounded-tr-2xl hover:rounded-br-[60px] hover:bg-white-gradient-conic hover:text-gray-900 hover:border-amber-700 hover:font-normal"
                />

                <Link
                    href="#contact"
                    startIcon={<BuildIcon className="w-6 h-6 text-green-600" />}
                    className="flex items-center justify-center font-thin !text-green-600 !no-underline p-4 border-solid border-2 border-gray-400 rounded-tl-[50px] rounded-bl-xl rounded-tr-2xl rounded-br-[60px] hover:rounded-bl-[60px] hover:rounded-tl-2xl hover:rounded-tr-xl hover:rounded-br-[60px] shadow-lg shadow-slate-600 mt-10 hover:border-amber-700 hover:bg-white-gradient-conic hover:text-sm transform duration-500"
                >
                    Let's build something together
                </Link>
            </div>
        </div>
    );
};

export default Hero;
