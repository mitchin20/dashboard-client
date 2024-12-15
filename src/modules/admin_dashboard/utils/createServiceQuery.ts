import axios from "axios";
import { Service } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

interface ServiceQueryProps {
    data: Service;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    refetchServices: () => void;
}

export const createServiceQuery = async ({
    data,
    setErrorMessage,
    setMessage,
    setLoading,
    refetchServices,
}: ServiceQueryProps) => {
    try {
        const response = await axios.post(`${API_URL}/create-service`, data);

        if (response.status === 200) {
            setMessage("Service created successfully");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to create service");
        throw error;
    } finally {
        refetchServices();
        setLoading(false);
    }
};
