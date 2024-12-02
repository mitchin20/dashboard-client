export const getBingoLetter = (number: number) => {
    if (number >= 1 && number <= 15) return "b";
    if (number >= 16 && number <= 30) return "i";
    if (number >= 31 && number <= 45) return "n";
    if (number >= 46 && number <= 60) return "g";
    if (number >= 61 && number <= 75) return "o";
    return "-";
};
