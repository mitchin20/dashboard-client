import axios from "axios";
import { EmployeeType } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

interface EmployeeQueryProps {
    employeeId: number;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    setDeletedEmployee: (employee: EmployeeType) => void;
    refetchEmployees: () => void;
}

export const deleteEmployeeQuery = async ({
    employeeId,
    setErrorMessage,
    setMessage,
    setLoading,
    setDeletedEmployee,
    refetchEmployees,
}: EmployeeQueryProps) => {
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
