import React, { useRef, useState } from "react";
import { InferType } from "yup";
import TextInput from "../../components/TextInput";
import HeaderText from "../../components/HeaderText";
import Snackbar from "../../components/Snackbar";
import { trimInputsValue } from "../utils/trimInputValue";
import { sendContactEmail, ContactSchema } from "../utils/sendContactEmail";

const Contact = () => {
    // Create refs for each input field
    const fullNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const messageRef = useRef<HTMLTextAreaElement | null>(null);

    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // Clear out the input field
    const clearInput = (
        ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (ref.current) {
            ref.current.value = "";
        }
    };

    const submitForm = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target as HTMLFormElement);
            // Returns an object created by key-value entries for properties and methods
            const payload = Object.fromEntries(formData);

            // Process each field in payload
            const processedPayload = trimInputsValue(payload);

            const validatedPayload: InferType<typeof ContactSchema> =
                await ContactSchema.validate(processedPayload, {
                    abortEarly: false,
                });

            await sendContactEmail({
                payload: validatedPayload,
                setMessage,
                setError,
            });

            clearInput(fullNameRef);
            clearInput(emailRef);
            clearInput(messageRef);
        } catch (error) {
            console.error(error);
            setError(
                "Failed to send the message. Please check your input field and try again."
            );
        }
    };
    return (
        <div
            id="contact"
            className="flex flex-col mx-auto xxs:w-full md:w-[60%] lg:w-1/3 transition duration-500 mb-14"
        >
            <div className="text-center leading-7 mx-4 mb-8">
                <HeaderText disableDivide className="text-blue-700">
                    Let&apos;s Chat&#33;
                </HeaderText>
                <p className="xxs:text-sm">
                    I would love to learn about your project. I am available for
                    hire. If you have any questions, comments, or suggestions.
                    I&apos;d love to hear from you and get to know you
                    better&#33;
                </p>
            </div>

            <form onSubmit={submitForm}>
                <div className="mx-4 mb-3">
                    <div className="my-8">
                        <TextInput
                            label="Full Name"
                            type="text"
                            name="fullName"
                            ref={fullNameRef}
                        />
                    </div>
                    <div className="my-8">
                        <TextInput
                            label="Email"
                            type="email"
                            name="email"
                            ref={emailRef}
                        />
                    </div>
                    <div className="my-8">
                        <TextInput
                            label="Message"
                            type="textarea"
                            name="message"
                            multiline
                            rows={5}
                            ref={messageRef}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </form>

            {message && (
                <Snackbar
                    message={message}
                    open={!!message}
                    autoHideDuration={5000}
                    onClose={() => setMessage(null)}
                    severity="success"
                    position="top"
                />
            )}

            {error && (
                <Snackbar
                    message={error}
                    open={!!error}
                    autoHideDuration={5000}
                    onClose={() => setError(null)}
                    severity="error"
                    position="top"
                />
            )}
        </div>
    );
};

export default Contact;
