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
    data: Employee;
    setErrorMessage: (message: string) => void;
    setMessage: (message: string) => void;
    setLoading: (loading: boolean) => void;
    refetchEmployees: () => void;
}

export const createEmployeeQuery = async ({
    data,
    setErrorMessage,
    setMessage,
    setLoading,
    refetchEmployees,
}: EmployeeQueryProps) => {
    try {
        const response = await axios.post(`${API_URL}/create-employee`, data);

        if (response.status === 200) {
            setMessage("Employee created successfully");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to create employee");
        throw error;
    } finally {
        refetchEmployees();
        setLoading(false);
    }
};
