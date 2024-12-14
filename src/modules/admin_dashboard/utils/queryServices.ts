import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;
const ttl = 10 * 60 * 1000;

type QueryServiceType = {
    setServices: (data: any) => void;
    setLoading: (data: boolean) => void;
    ignoreCache: boolean;
};

type ServiceType = {
    id: number;
    category: string;
    name: string;
    price: number;
};

export const getServices = async ({
    setServices,
    setLoading,
    ignoreCache,
}: QueryServiceType) => {
    try {
        setLoading(true);
        const cachedServices: ServiceType[] = getSessionStorage("services");
        if (cachedServices && !ignoreCache) {
            setServices(cachedServices);
            return;
        }
        const response = await axios.get(`${API_URL}/services`);
        const responseData: ServiceType[] = response?.data?.data;
        setServices(responseData);
        setSessionStorage("services", responseData, ttl);
    } catch (error) {
        console.error("Error fetching services data:", error);
    } finally {
        setLoading(false);
    }
};
