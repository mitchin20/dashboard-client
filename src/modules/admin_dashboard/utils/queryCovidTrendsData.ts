import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";

const ttl = 10 * 60 * 1000;

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

type QueryDataType = {
    selectedData: any;
    setCovidTrendsData: (data: any) => void;
};

export const queryCovidTrendsData = async ({
    selectedData,
    setCovidTrendsData,
}: QueryDataType): Promise<void> => {
    try {
        const cachedTrendsData: any = getSessionStorage(
            `covid-trends-${selectedData.state}`
        );
        if (cachedTrendsData) {
            setCovidTrendsData(cachedTrendsData);
            return;
        }
        const response = await axios.get(
            `${API_URL}/monthly-state-metrics-timeseries/${selectedData.state}`
        );
        setCovidTrendsData(response.data.data);
        setSessionStorage(
            `covid-trends-${selectedData.state}`,
            response.data.data,
            ttl
        );
    } catch (error) {
        console.error("Error fetching Covid trends data:", error);
    }
};
