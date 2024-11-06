import React, { useEffect, useState, memo } from "react";

// type: Allow the component to support different input types, such as "text", "password", "email", etc.
// placeholder: Optionally show placeholder text if the label is not enough or for accessibility.
// name: Specify the name attribute to facilitate form submission.
// id: Allow custom id for the input, which will be especially useful when multiple instances are used on the same page.
// disabled: Handle cases where the input should be read-only or inactive.
// error: Pass an error state or message to style or indicate errors.
// required: Set the input as required for form validation.
// className: Allow for custom styling or additional classes to be passed to the component.
// multiline: New prop to switch between input and textarea
// rows: Rows for textarea

export interface TextInputProps {
    label?: string;
    value?: string;
    onChange?: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    type?: string;
    placeholder?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    error?: string | boolean;
    required?: boolean;
    className?: string;
    multiline?: boolean;
    rows?: number;
    maxChars?: number;
}

const TextInput: React.FC<TextInputProps> = memo(
    ({
        label,
        value,
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
    }) => {
        const [isFilled, setIsFilled] = useState<boolean>(!!value);
        const [wordCount, setWordCount] = useState<number>(0);
        const [isLimitExceeded, setIsLimitExceeded] = useState<boolean>(false);

        // Calculate word count in the textarea input field
        useEffect(() => {
            if (value) {
                const count = value.length;
                setWordCount(count);
                setIsLimitExceeded(count > maxChars);
            } else {
                setWordCount(0);
            }
        }, [value, maxChars]);

        const handleOnChange = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            // Update isFilled based on content
            setIsFilled(event.target.value.length > 0);
            // Call the external onChange handler if provided
            onChange && onChange(event);
        };

        return (
            <div className="relative">
                {multiline ? (
                    <textarea
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleOnChange}
                        name={name}
                        disabled={disabled}
                        required={required}
                        rows={rows}
                        className={`border-solid border-2 rounded-lg p-2 w-full shadow-lg peer focus:outline-none resize-none ${error ? "border-red-500" : "border-gray-400"} ${disabled ? "bg-gray-100" : ""} ${className}`}
                    />
                ) : (
                    <input
                        id={id}
                        type={type}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleOnChange}
                        name={name}
                        disabled={disabled}
                        required={required}
                        className={`border-solid border-2 rounded-lg p-2 w-full shadow-lg peer focus:outline-none ${error ? "border-red-500" : "border-gray-400"} ${disabled ? "bg-gray-100" : ""} ${className}`}
                    />
                )}
                <label
                    htmlFor={id}
                    className={`absolute left-2 text-gray-400 bg-white px-2 transition-all duration-200 transform ${
                        isFilled
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
                        className={`text-sm mt-1 ${isLimitExceeded ? "text-red-500" : "text-gray-500"}`}
                    >
                        {wordCount}/{maxChars} words
                    </p>
                )}
                {error && typeof error === "string" && (
                    <p className="text-red-500 text-sm mt-1">{error}</p>
                )}
            </div>
        );
    }
);

export default TextInput;
