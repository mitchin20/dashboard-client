import React from "react";

interface LayoutProps {
    children: React.ReactNode;
    className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className, children }) => {
    return (
        <div
            className={`flex min-h-screen transform duration-1000 ${className}`}
        >
            {children}
        </div>
    );
};

export default Layout;
