import { useContext, useEffect, useState } from "react";
import CrabIcon from "../../../svgIcons/CrabIcon";
import ChickenIcon from "../../../svgIcons/ChickenIcon";
import DeerIcon from "../../../svgIcons/DeerIcon";
import GourdIcon from "../../../svgIcons/GourdIcon";
import FishIcon from "../../../svgIcons/FishIcon";
import ShrimpIcon from "../../../svgIcons/ShrimpIcon";
import { ThemeContext } from "../../../context/ThemeContext";
import Card2 from "../../components/Card2";
import CardContent from "../../components/CardContent";
import CardHeader from "../../components/CardHeader";

const resultColor = "text-rose-500 w-20 h-20 xxs:w-10 xxs:h-10";
const notResultColor = "text-gray-400 w-20 h-20 xxs:w-10 xxs:h-10";
const buttonStyle =
    "border rounded-full p-4 bg-white-gradient-conic font-semibold";

const maxDice = 3;

const availableNumbers = [
    { number: 1, Icon: CrabIcon },
    { number: 2, Icon: ChickenIcon },
    { number: 3, Icon: DeerIcon },
    { number: 4, Icon: GourdIcon },
    { number: 5, Icon: FishIcon },
    { number: 6, Icon: ShrimpIcon },
];

const BauCuaTomCa = () => {
    const { theme } = useContext(ThemeContext);

    const [rolledNumbers, setRolledNumbers] = useState<number[]>([]);
    const [startGame, setStartGame] = useState<boolean>(false);
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [results, setResults] = useState<any[]>([]);

    const handleStartGame = () => {
        setStartGame(true);
        setIsRolling(true);
    };

    const handleResetGame = () => {
        setRolledNumbers([]);
        setResults([]);
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout | undefined;

        if (startGame) {
            intervalId = setInterval(() => {
                setRolledNumbers((prevNum) => {
                    if (prevNum.length < maxDice) {
                        const randomNum = Math.floor(Math.random() * 6) + 1;
                        return [...prevNum, randomNum];
                    } else {
                        if (intervalId) {
                            clearInterval(intervalId);
                        }
                        return prevNum;
                    }
                });
            }, 2000);
        } else {
            if (intervalId) clearInterval(intervalId);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [startGame]);

    useEffect(() => {
        if (rolledNumbers.length === maxDice) {
            setStartGame(false);
            setIsRolling(false);
        }
    }, [rolledNumbers]);

    useEffect(() => {
        if (!startGame && rolledNumbers.length === maxDice) {
            rolledNumbers.map((num) => {
                const item = availableNumbers.find(
                    (item) => item.number === num
                );
                setResults((prev) => [...prev, item]);
            });
        }
    }, [startGame]);

    const icons =
        theme === "dark"
            ? "text-orange-200 w-10 h-10 xxs:w-7 xxs:h-7"
            : "text-orange-700 w-10 h-10 xxs:w-7 xxs:h-7";
    const textColor = theme === "dark" ? "text-white" : "text-green-400";

    return (
        <div
            className={`mt-8 transform duration-1000 ${textColor} text-center`}
        >
            <h1 className="text-4xl my-5 font-semibold xxs:text-2xl">
                Bầu Cua Tôm Cá
            </h1>

            <div className="grid grid-cols-3 place-items-center gap-2 lg:gap-8">
                {availableNumbers.map((item, i) => {
                    const Icon = item.Icon;
                    const isResults = results.some(
                        (result) => result.number === item.number
                    );

                    return (
                        <Card2
                            key={i}
                            className={`h-40 w-full ${theme === "dark" ? "bg-slate-700" : "bg-slate-300"} lg:w-[250px] md:h-44 xxs:h-32 xxs:w-full`}
                        >
                            <CardHeader>
                                {results.filter((r) => r.number === item.number)
                                    .length | 0}
                            </CardHeader>
                            <CardContent>
                                <div className="flex justify-center">
                                    <Icon
                                        className={`${!isResults ? notResultColor : resultColor} ${isResults ? "animate-pulse" : ""} ${isRolling && "animate-spin"}`}
                                    />
                                </div>
                            </CardContent>
                        </Card2>
                    );
                })}
            </div>

            <div className="flex flex-col justify-center items-center mt-10 gap-3">
                <button
                    type="button"
                    onClick={handleStartGame}
                    className={`${buttonStyle} ${isRolling ? "text-gray-400" : "text-slate-950"}`}
                    disabled={rolledNumbers.length > 0}
                >
                    {isRolling ? "Rolling Rolling" : "Start Rolling"}
                </button>

                <button
                    type="reset"
                    onClick={handleResetGame}
                    className={`${buttonStyle} text-slate-950`}
                    disabled={rolledNumbers.length < maxDice}
                >
                    Reset
                </button>

                <Card2 className="w-1/2 h-32 text-center bg-slate-700">
                    <CardHeader>Result</CardHeader>
                    <CardContent className="flex gap-x-3 justify-center">
                        {results.map((item, index) => {
                            const Icon = item.Icon;
                            return (
                                <div key={index}>
                                    <Icon className={`w-10 h-10 ${icons}`} />
                                </div>
                            );
                        })}
                    </CardContent>
                </Card2>
            </div>
        </div>
    );
};

export default BauCuaTomCa;
