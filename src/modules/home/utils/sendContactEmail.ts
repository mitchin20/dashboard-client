import axios from "axios";
import { object, string, InferType } from "yup";

const API_URL =
    process.env.REACT_APP_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;

export const ContactSchema = object({
    fullName: string().min(2).required("Full name is required"),
    email: string().email("Invalid email").required("Email is required"),
    message: string().min(2).max(2000).required("Message is required"),
});

type SendContactEmail = {
    payload: InferType<typeof ContactSchema>;
    setMessage: (message: string) => void;
    setError: (error: string) => void;
};

export const sendContactEmail = async ({
    payload,
    setMessage,
    setError,
}: SendContactEmail): Promise<void> => {
    try {
        const response = await axios.post(`${API_URL}/contact-email`, payload, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            setMessage("Message sent successfully");
        }
    } catch (error) {
        console.error(error);
        setError("Failed to send message");
    }
};
