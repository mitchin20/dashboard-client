import React, { useEffect, useRef } from "react";
import { MobileNavProps } from "../../../../types";

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, navItems }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickAway = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickAway);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickAway);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity ${
                isOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
            <div className="flex justify-center items-center h-full">
                <div
                    ref={modalRef}
                    className="bg-[#ffffff] border-double border-2 border-[#4c0519] w-4/5 max-w-md p-6 rounded-2xl shadow-lg"
                >
                    {/* NavItems */}
                    <nav className="flex flex-col space-y-4 mt-8 text-center">
                        {/* Close Button */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={onClose}
                                className="text-gray-700 hover:text-white hover:bg-[#831843] px-4 py-4 rounded-full transition duration-500 ease-in-out"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <defs>
                                        <mask id="strikethrough-mask">
                                            <rect
                                                width="24"
                                                height="24"
                                                fill="white"
                                            />
                                            <path
                                                d="M4 4l16 16"
                                                stroke="black"
                                                strokeWidth="2"
                                            />
                                        </mask>
                                    </defs>

                                    <g mask="url(#strikethrough-mask)">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </g>
                                </svg>
                            </button>
                        </div>

                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                onClick={onClose}
                                className="text-gray-700 font-medium hover:font-bold hover:drop-shadow-2xl hover:text-white hover:bg-[#831843] hover:scale-110 px-4 py-6 rounded-2xl transition duration-1000 ease-in-out"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default MobileNav;
