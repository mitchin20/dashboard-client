import React from "react";
import axios from "axios";
import { object, string, InferType } from "yup";
import TextInput from "../../components/TextInput";
import HeaderText from "../../components/HeaderText";
import Snackbar from "../../components/Snackbar";

const ContactSchema = object({
    fullName: string().min(2).required("Full name is required"),
    email: string().email("Invalid email").required("Email is required"),
    message: string().min(2).max(2000).required("Message is required"),
});

const trimInputsValue = (payload: any) => {
    return Object.keys(payload).reduce(
        (acc: Record<string, any>, key: string) => {
            const value = payload[key];
            if (typeof value === "string") {
                acc[key] = value.trim();
            } else {
                acc[key] = value;
            }

            return acc;
        },
        {} as Record<string, any>
    );
};

const Contact = () => {
    const [error, setError] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);

    const sendEmail = async (payload: InferType<typeof ContactSchema>) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/contact-email`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.status === 200) {
                setMessage("Message sent successfully");
            }
        } catch (error) {
            console.error(error);
            setError("Failed to send message");
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
                await ContactSchema.validateSync(processedPayload, {
                    abortEarly: false,
                });

            await sendEmail(validatedPayload);
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
                        />
                    </div>
                    <div className="my-8">
                        <TextInput label="Email" type="email" name="email" />
                    </div>
                    <div className="my-8">
                        <TextInput
                            label="Message"
                            type="textarea"
                            name="message"
                            multiline
                            rows={5}
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
