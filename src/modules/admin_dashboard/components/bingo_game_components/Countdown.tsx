import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";

interface CountdownProps {
    isGameActive: boolean;
    timer: number; // Initial timer value in seconds
}

const Countdown: React.FC<CountdownProps> = ({ isGameActive, timer }) => {
    const { theme } = useContext(ThemeContext);
    const [currentTimer, setCurrentTimer] = useState<number>(timer);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;

        if (isGameActive) {
            intervalId = setInterval(() => {
                setCurrentTimer((prevCount) => {
                    if (prevCount <= 1) {
                        return timer; // Reset back to timer when it reaches 0
                    } else {
                        return prevCount - 1;
                    }
                });
            }, 1000);
        } else {
            if (intervalId) clearInterval(intervalId);
            setCurrentTimer(timer);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isGameActive]);

    useEffect(() => {
        setCurrentTimer(timer);
    }, [timer]);

    return (
        <div
            className={`p-10 border rounded-2xl text-9xl font-bold ${theme === "dark" ? "text-white bg-green-400" : "text-red-500 bg-gray-200"} xxs:p-5 xxs:text-5xl xs:p-5 xs:text-5xl md:text-7xl shadow-xl`}
        >
            {currentTimer}
        </div>
    );
};

export default Countdown;
