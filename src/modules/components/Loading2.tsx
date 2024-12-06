import React from "react";
import LoadingIcon2 from "../../svgIcons/LoadingIcon2";
import "./Loading2.css";
const Loading2: React.FC = () => {
    return (
        <div className="relative w-screen h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
            {/* Shooting Light Rays */}
            <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
                {Array(50)
                    .fill(null)
                    .map((_, index) => {
                        // Randomize height in different ranges
                        const height =
                            Math.random() < 0.5
                                ? Math.random() * (800 - 50) + 50 // Short rays
                                : Math.random() * (2000 - 200) + 200; // Long rays

                        return (
                            <div
                                key={index}
                                className="absolute bg-gradient-to-r from-slate-200 to-transparent"
                                style={{
                                    width: "1px",
                                    height: `${height}px`, // Assign random height
                                    top: "50%",
                                    left: "50%",
                                    transformOrigin: "top",
                                    transform: `rotate(${Math.random() * 360}deg) translateY(40px)`, // Start from radius 100px
                                    animation: `shoot 2s linear ${Math.random() * 2}s infinite`,
                                }}
                            ></div>
                        );
                    })}
            </div>

            {/* Center Loading Icon */}
            <LoadingIcon2 className="w-20 h-20 animate-spin" />
        </div>
    );
};

export default Loading2;
