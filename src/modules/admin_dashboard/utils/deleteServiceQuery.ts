import axios from "axios";
import { DeleteServiceQueryProps } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

export const deleteServiceQuery = async ({
    serviceId,
    setDeletedService,
    setErrorMessage,
    setLoading,
    setMessage,
    refetchServices,
}: DeleteServiceQueryProps) => {
    try {
        setLoading(true);
        const response = await axios.delete(
            `${API_URL}/delete-service/${serviceId}`
        );

        if (response.status === 200) {
            setMessage(response.data.message);
            setDeletedService(response.data.data);
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to delete service");
        throw error;
    } finally {
        refetchServices();
        setLoading(false);
    }
};
