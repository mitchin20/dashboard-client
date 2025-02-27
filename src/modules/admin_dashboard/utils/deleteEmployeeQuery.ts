import axios from "axios";
import { DeleteEmployeeQueryProps, EmployeeType } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

export const deleteEmployeeQuery = async ({
    employeeId,
    setErrorMessage,
    setMessage,
    setLoading,
    setDeletedEmployee,
    refetchEmployees,
}: DeleteEmployeeQueryProps) => {
    try {
        setLoading(true);
        const response = await axios.delete(
            `${API_URL}/delete-employee/${employeeId}`
        );

        if (response.status === 200) {
            setMessage(response.data.message);
            setDeletedEmployee(response.data.data);
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to delete employee");
        throw error;
    } finally {
        refetchEmployees();
        setLoading(false);
    }
};
