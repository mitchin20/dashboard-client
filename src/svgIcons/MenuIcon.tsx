import React from "react";

interface MenuIconProps {
    className?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 80 80"
            className={className}
        >
            <path d="M 14 14 C 10.698375 14 8 16.698375 8 20 C 8 23.301625 10.698375 26 14 26 L 66 26 C 69.301625 26 72 23.301625 72 20 C 72 16.698375 69.301625 14 66 14 L 14 14 z M 14 16 L 66 16 C 67.537819 16 68.849368 16.862487 69.519531 18.125 A 1 1 0 0 0 70 20 C 70 22.220375 68.220375 24 66 24 L 14 24 C 11.779625 24 10 22.220375 10 20 A 1 1 0 0 0 10.482422 18.125 C 11.152724 16.862938 12.462514 16 14 16 z M 14 18 A 1 1 0 0 0 14 20 A 1 1 0 0 0 14 18 z M 18 18 A 1 1 0 0 0 18 20 A 1 1 0 0 0 18 18 z M 22 18 A 1 1 0 0 0 22 20 A 1 1 0 0 0 22 18 z M 26 18 A 1 1 0 0 0 26 20 A 1 1 0 0 0 26 18 z M 30 18 A 1 1 0 0 0 30 20 A 1 1 0 0 0 30 18 z M 34 18 A 1 1 0 0 0 34 20 A 1 1 0 0 0 34 18 z M 38 18 A 1 1 0 0 0 38 20 A 1 1 0 0 0 38 18 z M 42 18 A 1 1 0 0 0 42 20 A 1 1 0 0 0 42 18 z M 46 18 A 1 1 0 0 0 46 20 A 1 1 0 0 0 46 18 z M 50 18 A 1 1 0 0 0 50 20 A 1 1 0 0 0 50 18 z M 54 18 A 1 1 0 0 0 54 20 A 1 1 0 0 0 54 18 z M 58 18 A 1 1 0 0 0 58 20 A 1 1 0 0 0 58 18 z M 62 18 A 1 1 0 0 0 62 20 A 1 1 0 0 0 62 18 z M 66 18 A 1 1 0 0 0 66 20 A 1 1 0 0 0 66 18 z M 14 34 C 10.698375 34 8 36.698375 8 40 C 8 43.301625 10.698375 46 14 46 L 66 46 C 69.301625 46 72 43.301625 72 40 C 72 36.698375 69.301625 34 66 34 L 14 34 z M 14 36 L 66 36 C 67.537819 36 68.849368 36.862487 69.519531 38.125 A 1 1 0 0 0 70 40 C 70 42.220375 68.220375 44 66 44 L 14 44 C 11.779625 44 10 42.220375 10 40 A 1 1 0 0 0 10.482422 38.125 C 11.152724 36.862938 12.462514 36 14 36 z M 14 38 A 1 1 0 0 0 14 40 A 1 1 0 0 0 14 38 z M 18 38 A 1 1 0 0 0 18 40 A 1 1 0 0 0 18 38 z M 22 38 A 1 1 0 0 0 22 40 A 1 1 0 0 0 22 38 z M 26 38 A 1 1 0 0 0 26 40 A 1 1 0 0 0 26 38 z M 30 38 A 1 1 0 0 0 30 40 A 1 1 0 0 0 30 38 z M 34 38 A 1 1 0 0 0 34 40 A 1 1 0 0 0 34 38 z M 38 38 A 1 1 0 0 0 38 40 A 1 1 0 0 0 38 38 z M 42 38 A 1 1 0 0 0 42 40 A 1 1 0 0 0 42 38 z M 46 38 A 1 1 0 0 0 46 40 A 1 1 0 0 0 46 38 z M 50 38 A 1 1 0 0 0 50 40 A 1 1 0 0 0 50 38 z M 54 38 A 1 1 0 0 0 54 40 A 1 1 0 0 0 54 38 z M 58 38 A 1 1 0 0 0 58 40 A 1 1 0 0 0 58 38 z M 62 38 A 1 1 0 0 0 62 40 A 1 1 0 0 0 62 38 z M 66 38 A 1 1 0 0 0 66 40 A 1 1 0 0 0 66 38 z M 14 54 C 10.698375 54 8 56.698375 8 60 C 8 63.301625 10.698375 66 14 66 L 66 66 C 69.301625 66 72 63.301625 72 60 C 72 56.698375 69.301625 54 66 54 L 14 54 z M 14 56 L 66 56 C 67.537819 56 68.849368 56.862487 69.519531 58.125 A 1 1 0 0 0 70 60 C 70 62.220375 68.220375 64 66 64 L 14 64 C 11.779625 64 10 62.220375 10 60 A 1 1 0 0 0 10.482422 58.125 C 11.152724 56.862938 12.462514 56 14 56 z M 14 58 A 1 1 0 0 0 14 60 A 1 1 0 0 0 14 58 z M 18 58 A 1 1 0 0 0 18 60 A 1 1 0 0 0 18 58 z M 22 58 A 1 1 0 0 0 22 60 A 1 1 0 0 0 22 58 z M 26 58 A 1 1 0 0 0 26 60 A 1 1 0 0 0 26 58 z M 30 58 A 1 1 0 0 0 30 60 A 1 1 0 0 0 30 58 z M 34 58 A 1 1 0 0 0 34 60 A 1 1 0 0 0 34 58 z M 38 58 A 1 1 0 0 0 38 60 A 1 1 0 0 0 38 58 z M 42 58 A 1 1 0 0 0 42 60 A 1 1 0 0 0 42 58 z M 46 58 A 1 1 0 0 0 46 60 A 1 1 0 0 0 46 58 z M 50 58 A 1 1 0 0 0 50 60 A 1 1 0 0 0 50 58 z M 54 58 A 1 1 0 0 0 54 60 A 1 1 0 0 0 54 58 z M 58 58 A 1 1 0 0 0 58 60 A 1 1 0 0 0 58 58 z M 62 58 A 1 1 0 0 0 62 60 A 1 1 0 0 0 62 58 z M 66 58 A 1 1 0 0 0 66 60 A 1 1 0 0 0 66 58 z" />
        </svg>
    );
};

export default MenuIcon;
