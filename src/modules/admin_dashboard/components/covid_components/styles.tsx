import { styled } from "@mui/material";

interface StyledDivProps {
    fontSize?: string;
}

export const StyledDiv = styled("div")<StyledDivProps>(({ fontSize }) => ({
    display: "flex",
    justifyContent: "space-between",
    padding: "0.5rem 1rem",
    // Targeting the first child element
    "& > :first-of-type": {
        fontWeight: "bold",
        color: "#4a90e2",
    },

    // Targeting the second child element
    "& > :nth-of-type(2)": {
        color: "#ff6347",
    },
}));
