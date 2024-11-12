import React, { createContext, useState, useEffect } from "react";
import { getTheme, setNewTheme } from "../helpers/theme";

export const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
});

type Theme = "light" | "dark";

interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(getTheme("theme") || "light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        setNewTheme("theme", newTheme);
    };

    useEffect(() => {
        getTheme("theme");
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
