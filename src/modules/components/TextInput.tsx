import React, { useEffect, useState, memo, forwardRef } from "react";
import { TextInputProps } from "../../types";

const TextInput = forwardRef<
    HTMLInputElement | HTMLTextAreaElement,
    TextInputProps
>(
    (
        {
            label,
            value = "",
            onChange,
            type = "text",
            placeholder = " ",
            name,
            id = "floatingInput",
            disabled = false,
            error,
            required = false,
            className = "",
            multiline = false,
            rows = 3,
            maxChars = 2000,
        },
        ref
    ) => {
        const [localValue, setLocalValue] = useState<string>(value);
        const [wordCount, setWordCount] = useState<number>(value.length);
        const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);

        const formatAsCents = (val: string) => {
            // Remove all non-digits
            let numericVal = val.replace(/[^\d]/g, "");
            if (!numericVal) numericVal = "0";

            // Convert to integer (cents)
            const cents = parseInt(numericVal, 10);

            // Calculate dollars and fractional cents
            const dollars = Math.floor(cents / 100);
            const fractional = cents % 100;

            // Format: if dollars is 0, show "0.xx", else show "dollars.xx"
            return `${dollars === 0 ? "0" : dollars}.${fractional
                .toString()
                .padStart(2, "0")}`;
        };

        useEffect(() => {
            // If type is money (cents mode)
            if (type === "money") {
                if (value && value.toString().trim() !== "") {
                    // Format initial value
                    const formatted = formatAsCents(value.toString());
                    setLocalValue(formatted);
                    setWordCount(formatted.length);
                    setIsLimitExceeded(formatted.length > maxChars);
                } else {
                    // If no initial value, start empty
                    setLocalValue("");
                    setWordCount(0);
                    setIsLimitExceeded(false);
                }
            } else {
                setLocalValue(value);
                setWordCount(value.length);
                setIsLimitExceeded(value.length > maxChars);
            }
        }, [value, maxChars, type]);

        const handleOnChange = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            let newValue = event.target.value;

            if (type === "money") {
                newValue = formatAsCents(newValue);
            }

            if (newValue.length <= maxChars) {
                setLocalValue(newValue);
                setWordCount(newValue.length);
                setIsLimitExceeded(false);

                // Pass the formatted value up to the parent
                if (onChange) {
                    const syntheticEvent = {
                        ...event,
                        target: {
                            ...event.target,
                            value: newValue,
                        },
                    } as React.ChangeEvent<
                        HTMLInputElement | HTMLTextAreaElement
                    >;
                    onChange(syntheticEvent);
                }
            } else {
                setIsLimitExceeded(true);
            }
        };

        return (
            <div className="relative">
                {multiline ? (
                    <textarea
                        id={id}
                        placeholder={placeholder}
                        value={localValue}
                        onChange={handleOnChange}
                        name={name}
                        disabled={disabled}
                        required={required}
                        rows={rows}
                        ref={ref as React.Ref<HTMLTextAreaElement>}
                        className={`border-solid border-2 rounded-lg p-2 w-full shadow-lg peer focus:outline-none resize-none ${
                            error ? "border-red-500" : "border-gray-400"
                        } ${disabled ? "bg-gray-100" : ""} ${className}`}
                    />
                ) : (
                    <input
                        id={id}
                        type={type === "money" ? "text" : type}
                        placeholder={placeholder}
                        value={localValue}
                        onChange={handleOnChange}
                        name={name}
                        disabled={disabled}
                        required={required}
                        ref={ref as React.Ref<HTMLInputElement>}
                        className={`border-solid border-2 rounded-lg p-2 w-full shadow-lg peer focus:outline-none ${
                            error ? "border-red-500" : "border-gray-400"
                        } ${disabled ? "bg-gray-100" : ""} ${className}`}
                    />
                )}
                <label
                    htmlFor={id}
                    className={`absolute left-2 text-gray-400 bg-white px-2 transition-all duration-200 transform ${
                        localValue
                            ? "top-0 scale-75 -translate-y-3"
                            : "top-1/2 scale-100 -translate-y-1/2"
                    } pointer-events-none ${
                        multiline
                            ? "peer-placeholder-shown:top-5"
                            : "peer-placeholder-shown:top-1/2"
                    } peer-placeholder-shown:scale-100 peer-placeholder-shown:left-2.5 
                    peer-focus:top-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-blue-500 ${
                        error ? "text-red-500" : ""
                    }`}
                >
                    {label}
                </label>
                {multiline && (
                    <p
                        className={`text-sm mt-1 ${
                            isLimitExceeded ? "text-red-500" : "text-gray-500"
                        }`}
                    >
                        {wordCount}/{maxChars} characters
                    </p>
                )}
                {error && typeof error === "string" && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
            </div>
        );
    }
);

export default memo(TextInput);
