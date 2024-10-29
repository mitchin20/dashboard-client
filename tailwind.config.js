/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                xxs: "320px", // Extra extra small screens (small mobile devices)
                xs: "375px", // Extra small screens (iPhone SE, small Androids)
                sm: "640px", // Small screens (default, larger phones)
                md: "768px", // Medium screens (default, tablets)
                lg: "1024px", // Large screens (default, laptops)
                xl: "1280px", // Extra large screens (default, desktops)
                "2xl": "1536px", // 2x extra large screens (default)
                "3xl": "1920px", // Custom extra large screens
                "4k": "2560px", // 4K resolution breakpoint
            },
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
