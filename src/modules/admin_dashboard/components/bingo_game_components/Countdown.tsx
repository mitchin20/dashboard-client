import React, { useEffect, useState } from "react";

interface CountdownProps {
    isGameActive: boolean;
    timer: number; // Initial timer value in seconds
}

const Countdown: React.FC<CountdownProps> = ({ isGameActive, timer }) => {
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
            className={`p-10 border rounded-2xl text-9xl font-bold text-blue-600 md:text-7xl`}
        >
            {currentTimer}
        </div>
    );
};

export default Countdown;
