import React from "react";
import TextInput from "../../components/TextInput";
import HeaderText from "../../components/HeaderText";

const Contact = () => {
    const submitForm = (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        // Returns an object created by key-value entries for properties and methods
        const payload = Object.fromEntries(formData);

        // Process each field in payload
        const processedPayload = Object.keys(payload).reduce(
            (acc: Record<string, any>, key: string) => {
                const value = payload[key];
                if (typeof value === "string") {
                    // Trim whitespace and check if empty
                    acc[key] = value.trim();
                } else {
                    acc[key] = value;
                }

                return acc;
            },
            {} as Record<string, any>
        );

        console.log(processedPayload);
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
                <div className="mx-4">
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
        </div>
    );
};

export default Contact;
