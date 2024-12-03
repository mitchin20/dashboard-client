import React, {
    useState,
    useEffect,
    lazy,
    useMemo,
    useCallback,
    useRef,
} from "react";
import TextInput from "../../components/TextInput";
import { styled } from "@mui/material";
import { getBingoLetter } from "../../../helpers/getBingoLetter";
import { useCachedVoices } from "../../../helpers/cacheVoices";
import useBingoSpeech from "../../../helpers/useBingoSpeech";

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

    return (
        <div>
            <div className="grid grid-cols-12 gap-5 mt-10">
                <div className="flex flex-col col-span-2 gap-10">
                    <ButtonStyled
                        onClick={toggleGame}
                        disabled={isGameOver}
                        className="md:!text-lg"
                    >
                        {isGameActive ? "Stop" : "Start"} Game
                    </ButtonStyled>
                    <TextInput
                        label="Timer"
                        type="text"
                        value={timer.toString()}
                        onChange={handleTimerInput}
                        disabled={isGameActive}
                    />
                    <ButtonStyled
                        onClick={() => resetGame()}
                        type="reset"
                        className="md:!text-lg"
                    >
                        Reset Game
                    </ButtonStyled>
                </div>
                <div className="col-span-10">
                    <GameBoard
                        gameNumbers={gameNumbers}
                        rolledNumbers={rolledNumbers}
                    />
                </div>
            </div>

            <div className="grid grid-cols-12 place-items-center text-center">
                <h2 className=" col-span-9 text-[280px] text-red-600 font-bold mb-2 md:text-[200px]">
                    {currentNumber !== null &&
                        getBingoLetter(currentNumber).toUpperCase()}
                    -{currentNumber !== null ? currentNumber : "-"}
                </h2>
                <div className="col-span-3">
                    <Countdown isGameActive={isGameActive} timer={timer} />
                </div>
            </div>
        </div>
    );
};

export default BingoGame;
