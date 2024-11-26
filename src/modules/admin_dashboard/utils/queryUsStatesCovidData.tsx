import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";

const ttl = 10 * 60 * 1000;

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

type QueryDataType = {
    setData: (data: any) => void;
    setLoading: (loading: boolean) => void;
};

export const queryUsStatesCovidData = async ({
    setData,
    setLoading,
}: QueryDataType): Promise<void> => {
    setLoading(true);
    try {
        // local cache if page refreshing
        const cachedData: any = getSessionStorage("all-states-covid-data");
        if (cachedData) {
            // return cachedData;
            setData(cachedData);
        }
        const response = await axios.get(`${API_URL}/all-us-states-covid-data`);

        if (Array.isArray(response.data.data)) {
            setSessionStorage("all-states-covid-data", response.data.data, ttl);
            setData(response.data.data);
        } else {
            setData([]);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};
