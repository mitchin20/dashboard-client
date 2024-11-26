import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;
const ttl = 10 * 60 * 1000;

type Data = {
    data: any;
    success: boolean;
    error?: string;
    message?: string;
};

type CountyMetricType = {
    countyFips: string;
    setCountyData: (data: any) => void;
    setErrorMessage: (error: string) => void;
    setMessage: (message: string) => void;
    setCountyLoading: (loading: boolean) => void;
};

export const getCountyMetricData = async ({
    countyFips,
    setCountyData,
    setErrorMessage,
    setMessage,
    setCountyLoading,
}: CountyMetricType): Promise<void> => {
    try {
        setCountyLoading(true);
        const cachedData: any = getSessionStorage(
            `${countyFips}-county-metric`
        );
        if (cachedData) {
            setCountyData(cachedData);
            setMessage("Successfully fetch data");
            return;
        }

        const response = await axios.get(
            `${API_URL}/county-metric/${countyFips}`
        );

        if (response.status !== 200) {
            setErrorMessage(
                `Error: ${response.status} - ${response.statusText}`
            );
            setCountyData("");
            return;
        }

        const responseData: Data = response?.data;

        setSessionStorage(
            `${countyFips}-county-metric`,
            responseData?.data?.data,
            ttl
        );
        setCountyData(responseData?.data?.data);
        setMessage("Successfully fetch data");
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to fetch county data");
        setCountyData("");
        setCountyLoading(false);
    } finally {
        setCountyLoading(false);
    }
};
