import axios from "axios";
import { ServiceQueryProps } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

export const updateServiceQuery = async ({
    serviceId,
    data,
    setErrorMessage,
    setMessage,
    setLoading,
    refetchServices,
}: ServiceQueryProps) => {
    try {
        const response = await axios.put(
            `${API_URL}/update-service/${serviceId}`,
            data
        );

        if (response.status === 200) {
            setMessage("Service updated successfully");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to update service");
        throw error;
    } finally {
        refetchServices();
        setLoading(false);
    }
};
