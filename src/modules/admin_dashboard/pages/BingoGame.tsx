import {
    memo,
    useContext,
    useState,
    useMemo,
    useCallback,
    useRef,
    useEffect,
} from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { getBingoLetter } from "../../../helpers/getBingoLetter";
import { bingoColumns } from "../../../helpers/getBingoColumns";
import useBingoSpeech from "../../../helpers/useBingoSpeech";
import { useCachedVoices } from "../../../helpers/cacheVoices";
import styled from "@emotion/styled";
import TextInput from "../../components/TextInput";

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

const gameNumbers = Array.from({ length: 75 }, (_, i) => i + 1);

const BingoGame = () => {
    const { winSize } = useContext(ThemeContext);
    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [rolledNumbers, setRolledNumbers] = useState<number[]>([]);

    const [gameStart, setGameStart] = useState<boolean>(false);
    const [gamePause, setGamePause] = useState<boolean>(false);
    const [gameSpeed, setGameSpeed] = useState<number>(5);
    const [countdown, setCountdown] = useState<number>(gameSpeed);

    const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleStartGame = () => {
        setGameStart(true);
        setGamePause(false);
    };

    const handlePausedGame = () => {
        setGamePause(!gamePause);
    };

    const handleResetGame = () => {
        setGameStart(false);
        setGamePause(false);
        setRolledNumber(null);
        setRolledNumbers([]);
        setCountdown(gameSpeed); // Reset countdown
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
            countdownIntervalRef.current = null;
        }
    };

    const handleGameSpeedChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const value = event.target.value;
        const speed = value === "" ? 0 : Number(value);
        setGameSpeed(speed);
        setCountdown(speed);
    };

    const rollNumber = () => {
        const availableNumbers = gameNumbers.filter(
            (num) => !rolledNumbers.includes(num)
        );

        if (availableNumbers.length > 0) {
            const randomIndex = Math.floor(
                Math.random() * availableNumbers.length
            );
            const randomNumber = availableNumbers[randomIndex];
            setRolledNumber(randomNumber);
            setRolledNumbers((prev) => [...prev, randomNumber]);
        } else {
            // No numbers left, stop the game
            handleResetGame();
        }
    };

    useEffect(() => {
        // Clear any existing intervals before setting a new one
        if (countdownIntervalRef.current) {
            clearInterval(countdownIntervalRef.current);
        }

        if (gameStart && !gamePause) {
            // Set the initial countdown to the current game speed
            setCountdown(gameSpeed);

            // Set a new countdown interval based on the current game speed
            countdownIntervalRef.current = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        rollNumber(); // Only roll the number once per countdown completion
                        return gameSpeed; // Reset countdown to the current game speed
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
        } else {
            // If the game is paused or stopped, clear the countdown interval
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
        }

        // Clean up interval on component unmount or when the game state changes
        return () => {
            if (countdownIntervalRef.current) {
                clearInterval(countdownIntervalRef.current);
                countdownIntervalRef.current = null;
            }
        };
    }, [gameStart, gamePause, gameSpeed]); // <-- gameSpeed is included to reflect changes

    const xxlScreen = winSize && winSize >= 1536;

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
        rolledNumber,
        getBingoLetter: bingoLetter,
        englishVoice,
        vietnameseVoice,
    });

    return (
        <div className="text-center p-5">
            <div className="grid grid-cols-2 gap-5 items-center">
                <div className="flex flex-col items-center">
                    <div className="flex gap-5 justify-center items-center mb-5">
                        <ButtonStyled
                            onClick={handleStartGame}
                            disabled={gameStart && !gamePause}
                        >
                            {gameStart
                                ? gamePause
                                    ? "Paused"
                                    : "Playing"
                                : "Start"}
                        </ButtonStyled>
                        <ButtonStyled
                            onClick={handlePausedGame}
                            disabled={!gameStart}
                        >
                            {gamePause ? "Resume" : "Pause"}
                        </ButtonStyled>
                        <ButtonStyled onClick={handleResetGame}>
                            Reset
                        </ButtonStyled>
                    </div>
                    <div>
                        <TextInput
                            label="Game Speed in Seconds"
                            type="text"
                            value={gameSpeed.toString()}
                            onChange={handleGameSpeedChange}
                        />

                        <div className="countdown-card mt-2 mb-4 p-4 border rounded-2xl text-8xl font-bold text-blue-600">
                            {countdown}
                        </div>
                    </div>
                    <h1
                        className={`text-[280px] ${xxlScreen ?? "text-[250px]"} font-bold text-red-600`}
                    >
                        {rolledNumber !== null &&
                            getBingoLetter(rolledNumber).toUpperCase()}
                        -{rolledNumber !== null ? rolledNumber : "-"}
                    </h1>
                </div>

                <div>
                    <div className="grid grid-cols-5 items-start">
                        {Object.entries(bingoColumns).map(
                            ([letter, numbers]) => (
                                <div
                                    key={letter}
                                    className="flex flex-col items-center gap-1"
                                >
                                    <h4 className="mb-2 font-bold text-5xl text-blue-700">
                                        {letter}
                                    </h4>
                                    {numbers.map((number) => (
                                        <div
                                            key={number}
                                            className={`w-8 h-8 !text-2xl p-5 rounded-full flex items-center justify-center mb-1 ${
                                                rolledNumbers.includes(number)
                                                    ? "text-white bg-red-400"
                                                    : "text-gray-300 bg-gray-200"
                                            }`}
                                        >
                                            {number}
                                        </div>
                                    ))}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(BingoGame);
