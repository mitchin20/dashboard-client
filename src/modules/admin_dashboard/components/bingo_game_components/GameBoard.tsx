import React from "react";

interface GameBoardProps {
    gameNumbers: number[];
    rolledNumbers: number[];
}

const GameBoard: React.FC<GameBoardProps> = ({
    gameNumbers,
    rolledNumbers,
}) => {
    return (
        <div className={`grid grid-cols-5 place-items-center gap-4 xxs:gap-1`}>
            {["B", "I", "N", "G", "O"].map((letter, index) => (
                <div
                    key={letter}
                    className="border rounded-2xl w-full place-items-center p-3 xxs:p-2 text-center bg-green-600"
                >
                    <h4 className="text-4xl text-white font-bold mb-2">
                        {letter}
                    </h4>
                    <div
                        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2`}
                    >
                        {gameNumbers
                            .slice(index * 15, (index + 1) * 15)
                            .map((number) => (
                                <div
                                    key={number}
                                    className={`w-8 h-8 flex items-center justify-center text-sm border border-blue-200 rounded-full ${rolledNumbers.includes(number) ? "bg-red-500 text-white font-bold" : "bg-white text-gray-400"} xl:w-10 xl:h-10 xl:text-base 2xl:w-14 2xl:h-14 2xl:text-lg`}
                                >
                                    {number}
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameBoard;
