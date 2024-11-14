import React, { createContext, useState, useEffect } from "react";
import { getTheme, setNewTheme } from "../helpers/theme";

export const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
    winSize: 0,
});

type Theme = "light" | "dark";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getTheme("theme") || "light");
    const [winSize, setWinSize] = useState<number>(window.innerWidth);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setNewTheme("theme", newTheme);
    };

    useEffect(() => {
        getTheme("theme");
    }, [theme]);

    useEffect(() => {
        const handleResize = () => {
            setWinSize(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, winSize, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
