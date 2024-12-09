import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;
const ttl = 10 * 60 * 1000;

type QueryEmployeesType = {
    setEmployees: (data: any) => void;
    setLoading: (data: boolean) => void;
};

type Employees = {
    id: number;
    fristName: string;
    lastName: string;
    fullName: string;
    color: string;
    phone: string;
    email: string;
};

export const getEmployees = async ({
    setEmployees,
    setLoading,
}: QueryEmployeesType): Promise<void> => {
    try {
        setLoading(true);
        const cachedEmployees: Employees[] = getSessionStorage("employees");
        if (cachedEmployees) {
            setEmployees(cachedEmployees);
            return;
        }
        const response = await axios.get(`${API_URL}/employees`);
        const responseData: Employees[] = response?.data?.data;
        setEmployees(responseData);
        setSessionStorage("employees", responseData, ttl);
    } catch (error) {
        console.error("Error fetching employees data:", error);
    } finally {
        setLoading(false);
    }
};
