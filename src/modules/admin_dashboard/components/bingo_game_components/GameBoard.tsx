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
        <div className="grid grid-cols-5 place-items-center gap-4">
            {["B", "I", "N", "G", "O"].map((letter, index) => (
                <div
                    key={letter}
                    className="border rounded-2xl lg:w-full place-items-center p-3 text-center bg-white-gradient-conic"
                >
                    <h4 className="text-xl text-blue-700 font-bold mb-2">
                        {letter}
                    </h4>
                    <div className={`grid grid-cols-3 md:grid-cols-2 gap-2`}>
                        {gameNumbers
                            .slice(index * 15, (index + 1) * 15)
                            .map((number) => (
                                <div
                                    key={number}
                                    className={`w-10 h-10 flex items-center justify-center text-sm border border-blue-200 rounded-full ${rolledNumbers.includes(number) ? "bg-red-300 text-white" : "bg-white text-gray-400"} xl:w-14 xl:h-14 xl:text-lg`}
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
