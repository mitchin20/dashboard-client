import React, { useEffect, useState, memo, forwardRef } from "react";
import { TextInputProps } from "../../types";

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

        // Sync local state with value prop when it changes
        useEffect(() => {
            setLocalValue(value);
            setWordCount(value.length);
            setIsLimitExceeded(value.length > maxChars);
        }, [value, maxChars]);

        const handleOnChange = (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
            const newValue = event.target.value;

            // Enforce max character limit
            if (newValue.length <= maxChars) {
                setLocalValue(newValue);
                setWordCount(newValue.length);
                setIsLimitExceeded(false);

                // Call the external onChange handler if provided
                if (onChange) {
                    onChange(event);
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
                        type={type}
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
