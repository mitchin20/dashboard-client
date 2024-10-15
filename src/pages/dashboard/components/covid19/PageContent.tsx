import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { CovidData } from "../../../../types";
import StatesPopulation from "./StatesPopulation";
import StatesVaccinationRatios from "./StatesVaccinationRatios";
import Trends from "./Trends";
import {
    setSessionStorage,
    getSessionStorage,
} from "../../../../helpers/sessionStorage";

const ttl = 10 * 60 * 1000;

const PageContent = () => {
    // State variables
    const [data, setData] = useState<CovidData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);

    // Fetch data from API endpoint
    useEffect(() => {
        const cachedData: any = getSessionStorage("all-us-states-covid-data");

        if (cachedData && !cachedData?.value?.expiry) {
            setData(cachedData);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/all-us-states-covid-data`
                );
                const results = await response.data;
                setSessionStorage(
                    "all-us-states-covid-data",
                    results.data,
                    ttl
                );
                setData(results.data);
            } catch (error) {
                setError(error as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div
            style={{
                marginLeft: "10px",
            }}
        >
            <StatesPopulation data={data} loading={loading} />
            <StatesVaccinationRatios data={data} loading={loading} />
            <Trends />
        </div>
    );
};

export default PageContent;
