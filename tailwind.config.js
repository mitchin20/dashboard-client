/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                transparent: "transparent",
                current: "currentColor",
                white: "#ffffff",
                black: "#000000",
                primary: "#FF0000",
                secondary: "#FF7F00",
                accent: "#00FF00",
                neutral: "#0000FF",
                info: "#FF00FF",
                success: "#00FFFF",
                warning: "#FFFF00",
                error: "#FF0000",
            },
            keyframes: {
                scroll: {
                    "0%": { transform: "translateX(100%)" },
                    "100%": { transform: "translateX(-100%)" },
                },
            },
            animation: {
                scroll: "scroll 10s linear infinite",
            },
        },
    },
    plugins: [],
};
