import React, {
    useState,
    useEffect,
    lazy,
    useMemo,
    useCallback,
    useRef,
    useContext,
} from "react";
import TextInput from "../../components/TextInput";
import { styled } from "@mui/material";
import { getBingoLetter } from "../../../helpers/getBingoLetter";
import { useCachedVoices } from "../../../helpers/cacheVoices";
import useBingoSpeech from "../../../helpers/useBingoSpeech";
import { ThemeContext } from "../../../context/ThemeContext";
import Tooltip from "../../components/Tooltip";

const Countdown = lazy(
    () => import("../components/bingo_game_components/Countdown")
);
const GameBoard = lazy(
    () => import("../components/bingo_game_components/GameBoard")
);

const ButtonStyled = styled("button")(({ disabled }) => ({
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    border: "1px solid #ccc",
    borderRadius: "50px",
    cursor: disabled ? "not-allowed" : "pointer",
    textAlign: "center",
    backgroundColor: disabled ? "#e0e0e0" : "initial",
    color: disabled ? "#999" : "initial",
    "&:hover": {
        backgroundColor: disabled ? "#e0e0e0" : "#ccc",
    },
}));

type IntervalId = ReturnType<typeof setInterval> | null;

const BingoGame: React.FC = () => {
    const { theme, winSize } = useContext(ThemeContext);

    // Game Control States
    const [isGameActive, setIsGameActive] = useState<boolean>(false);
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    // Number Management States
    const [gameNumbers] = useState<number[]>(
        Array.from({ length: 75 }, (_, i) => i + 1)
    ); // Static game numbers for the board template
    const [availableNumbers, setAvailableNumbers] = useState<number[]>([
        ...gameNumbers,
    ]); // Available numbers to be rolled
    const [rolledNumbers, setRolledNumbers] = useState<number[]>([]); // Numbers that have been rolled
    const [currentNumber, setCurrentNumber] = useState<number | null>(null);

    // Speed Management State
    const [timer, setTimer] = useState<number>(5); // Default to 5 seconds

    // Interval ID for Auto Rolling
    const [intervalId, setIntervalId] = useState<IntervalId>(null);

    // Effect to handle rolling a number
    useEffect(() => {
        if (isGameActive) {
            if (availableNumbers.length === 0) {
                setIsGameOver(true);
                setIsGameActive(false);
                if (intervalId) clearInterval(intervalId);
                return;
            }
            const id = setInterval(() => {
                setCurrentNumber((prevCurrentNumber) => {
                    if (availableNumbers.length === 0) {
                        setIsGameOver(true);
                        setIsGameActive(false);
                        clearInterval(id);
                        return prevCurrentNumber;
                    }
                    const randomIndex = Math.floor(
                        Math.random() * availableNumbers.length
                    );
                    const number = availableNumbers[randomIndex];
                    return number;
                });
            }, timer * 1000);
            setIntervalId(id);
            return () => clearInterval(id);
        } else {
            if (intervalId) clearInterval(intervalId);
        }
    }, [isGameActive, timer, availableNumbers]);

    // Effect to update rolledNumbers and availableNumbers whenever currentNumber changes
    useEffect(() => {
        if (currentNumber !== null) {
            setRolledNumbers((prev) => [...prev, currentNumber]);
            setAvailableNumbers((prev) =>
                prev.filter((num) => num !== currentNumber)
            );
        }
    }, [currentNumber]);

    // Function to start or stop the game
    const toggleGame = () => {
        if (isGameOver) return;
        setIsGameActive((prev) => !prev);
    };

    // Add event listener for spacebar key to toggle game start/stop
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === "Space") {
                event.preventDefault(); // Prevent the page from scrolling
                toggleGame();
            }
        };

        // Add keydown event listener when game is not over
        if (!isGameOver) {
            window.addEventListener("keydown", handleKeyDown);
        }

        // Cleanup function to remove the event listener when the component unmounts or game state changes
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isGameActive, isGameOver]);

    // Function to reset the game
    const resetGame = () => {
        setIsGameActive(false);
        setIsGameOver(false);
        setAvailableNumbers([...gameNumbers]);
        setRolledNumbers([]);
        setCurrentNumber(null);
        if (intervalId) clearInterval(intervalId);
    };

    // Handle timer input
    const handleTimerInput = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = Number(event.target.value);
        setTimer(value);
    };

    // Web Speech API
    const voices = useCachedVoices();

    const englishVoice = useMemo(
        () =>
            voices.find(
                (voice) =>
                    voice.name === "Microsoft Mark - English (United States)"
            ),
        [voices]
    );

    const vietnameseVoice = useMemo(
        () => voices.find((voice) => voice.lang === "vi-VN"),
        [voices]
    );

    const bingoLetter = useCallback((num: number) => {
        return getBingoLetter(num);
    }, []);

    useBingoSpeech({
        rolledNumber: currentNumber,
        getBingoLetter: bingoLetter,
        englishVoice,
        vietnameseVoice,
    });

    const xsScreen = winSize && winSize <= 640;

    return (
        <div>
            <div className="grid grid-cols-12 gap-5 mt-10">
                <div
                    className={`flex flex-col col-span-2 xs:col-span-12 xs:flex-row xs:justify-center xs:items-center xxs:col-span-12 xxs:flex-row xxs:justify-center xxs:items-center gap-10`}
                >
                    <button
                        onClick={toggleGame}
                        disabled={isGameOver}
                        className={`border rounded-full p-2 text-base xl:text-2xl font-semibold shadow-md ${theme === "dark" ? "text-white" : "text-black"}`}
                    >
                        <Tooltip
                            content="Use mouse or Spacebar to toggle"
                            position="right"
                        >
                            {isGameActive ? "Stop" : "Start"} Game
                        </Tooltip>
                    </button>
                    <TextInput
                        label="Timer"
                        type="text"
                        value={timer.toString()}
                        onChange={handleTimerInput}
                        disabled={isGameActive}
                    />
                    <button
                        onClick={() => resetGame()}
                        type="reset"
                        className={`border rounded-full p-2 text-base xl:text-2xl font-semibold shadow-md ${theme === "dark" ? "text-white" : "text-black"}`}
                    >
                        Reset Game
                    </button>
                </div>

                {xsScreen && (
                    <div className="col-span-12 place-items-center text-center">
                        <div
                            className={`col-span-3 xs:col-span-12 xs:mt-10 xxs:col-span-12 xxs:mt-10`}
                        >
                            <Countdown
                                isGameActive={isGameActive}
                                timer={timer}
                            />
                        </div>
                        <h2
                            className={`${theme === "dark" ? "text-white" : "text-green-600"} col-span-9 xs:col-span-12 xxs:col-span-12 xxs:mt-5 font-bold mb-2 xxs:text-7xl xs:text-[150px] md:text-[200px] lg:text-[280px]`}
                        >
                            {currentNumber !== null &&
                                getBingoLetter(currentNumber).toUpperCase()}
                            -{currentNumber !== null ? currentNumber : "-"}
                        </h2>
                    </div>
                )}

                <div
                    className={`col-span-10 xs:col-span-12 xs:place-items-center xxs:col-span-12 xxs:place-items-center`}
                >
                    <GameBoard
                        gameNumbers={gameNumbers}
                        rolledNumbers={rolledNumbers}
                    />
                </div>
            </div>

            {!xsScreen && (
                <div className="grid grid-cols-12 place-items-center text-center">
                    <div
                        className={`col-span-3 xs:col-span-12 xs:mt-10 xxs:col-span-12 xxs:mt-10`}
                    >
                        <Countdown isGameActive={isGameActive} timer={timer} />
                    </div>
                    <h2
                        className={`${theme === "dark" ? "text-white" : "text-green-600"} col-span-9 xs:col-span-12 xxs:col-span-12 xxs:mt-5 font-bold mb-2 xxs:text-7xl xs:text-[150px] md:text-[200px] lg:text-[280px]`}
                    >
                        {currentNumber !== null &&
                            getBingoLetter(currentNumber).toUpperCase()}
                        -{currentNumber !== null ? currentNumber : "-"}
                    </h2>
                </div>
            )}
        </div>
    );
};

export default BingoGame;
