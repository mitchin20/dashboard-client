import React, { useEffect } from "react";

export interface SnackbarProps {
    message: string;
    open: boolean;
    onClose?: () => void;
    autoHideDuration?: number;
    severity?: "success" | "error" | "warning" | "info";
    action?: React.ReactNode;
    position?: "top" | "bottom" | "left" | "right";
    className?: string;
}

const Snackbar: React.FC<SnackbarProps> = ({
    message,
    open = true,
    onClose,
    autoHideDuration,
    severity,
    action,
    position,
    className,
}) => {
    const positionStyle = () => {
        switch (position) {
            case "top":
                return "top-24";
            case "bottom":
                return "bottom-4";
            default:
                return "top-24";
        }
    };

    const textStyle = () => {
        switch (severity) {
            case "success":
                return "text-emerald-600 border-emerald-600";
            case "error":
                return "text-rose-600 border-rose-600";
            case "warning":
                return "text-amber-600 border-amber-600";
            case "info":
                return "text-sky-600 border-sky-600";
            default:
                return "text-gray-800 border-gray-800";
        }
    };

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, autoHideDuration || 5000);
            return () => clearTimeout(timer);
        }
    }, [open, autoHideDuration, onClose]);

    if (!open) {
        return null;
    }

    return (
        <div
            className={`fixed inset-x-0 flex items-start justify-center mx-auto max-w-xs ${textStyle()} ${positionStyle()} border-solid border-2 px-4 py-2 rounded-2xl transform duration-500 animate-slideIn z-2 shadow-lg shadow-gray-600 bg-white ${className}`}
        >
            <span>{message}</span>
            {action && <div style={{ marginLeft: "auto" }}>{action}</div>}
        </div>
    );
};

export default Snackbar;
