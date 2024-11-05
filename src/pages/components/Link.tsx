import React from "react";

interface LinkProps {
    text: string;
    href?: string;
    rel?: string;
    target?: string;
    ariaLabel?: string;
    id?: string;
    role?: string;
    download?: string;
    tabIndex?: number;
    onClick?: () => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    className?: string;
}

const Link: React.FC<LinkProps> = ({
    text,
    href,
    rel,
    target,
    ariaLabel,
    id,
    role,
    download,
    tabIndex,
    onClick,
    startIcon,
    endIcon,
    className,
}) => {
    return (
        <a
            href={href}
            id={id}
            rel={rel}
            target={target}
            aria-label={ariaLabel}
            role={role}
            download={download}
            tabIndex={tabIndex}
            onClick={onClick}
            className={`underline text-blue-500 hover:text-blue-700 ${className}`}
        >
            {startIcon && <span className="mr-2">{startIcon}</span>}
            {text}
            {endIcon && <span className="ml-2">{endIcon}</span>}
        </a>
    );
};

export default Link;
