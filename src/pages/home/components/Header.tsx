import React, { useState } from "react";
import MobileNav from "./navViews/MobileNav";
import DesktopNav from "./navViews/DesktopNav";

const navItems = [
    {
        label: "Home",
        href: "#home",
    },
    {
        label: "Features",
        href: "#features",
    },
    {
        label: "Pricing",
        href: "#pricing",
    },
    {
        label: "Contact",
        href: "#contact",
    },
];

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <header className="sticky top-0 bg-white shadow-md z-10">
            <nav className="container mx-auto flex justify-center md:p-4 xxs:p-0">
                {/* Navigation Links */}
                <DesktopNav isView={isMenuOpen} navItems={navItems} />

                {/* Mobile Menu Button */}
                <div className="md:hidden p-2">
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="text-gray-700 hover:text-white hover:bg-[#831843] p-4 rounded-full transition duration-200 ease-in-out"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Nav */}
                <MobileNav
                    isOpen={isMenuOpen}
                    onClose={toggleMenu}
                    navItems={navItems}
                />
            </nav>
        </header>
    );
};

export default Header;
