import axios from "axios";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    color: string;
};

interface EmployeeQueryProps {
    employeeId: number;
    data: Employee;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    refetchEmployees: () => void;
}

export const updateEmployeeQuery = async ({
    employeeId,
    data,
    setErrorMessage,
    setMessage,
    setLoading,
    refetchEmployees,
}: EmployeeQueryProps) => {
    try {
        const response = await axios.put(
            `${API_URL}/update-employee/${employeeId}`,
            data
        );

        if (response.status === 200) {
            setMessage("Employee updated successfully");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to update employee");
        throw error;
    } finally {
        refetchEmployees();
        setLoading(false);
    }
};
