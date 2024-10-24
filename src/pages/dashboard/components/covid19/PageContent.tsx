import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
    // const [error, setError] = useState<AxiosError | null>(null);

    const fetchData = async () => {
        // local cache if page refreshing
        const cachedData: any = getSessionStorage("all-states-covid-data");
        if (cachedData) {
            return cachedData;
        }

        const response = await axios.get(
            `${process.env.REACT_APP_SERVER_URL}/all-us-states-covid-data`
        );
        setSessionStorage("all-states-covid-data", response.data.data, ttl);

        return response.data.data;
    };

    const useCovidDataQueryOptions = () => ({
        queryKey: ["all-states-covid-data"],
        queryFn: fetchData,
        staleTime: 5 * 60 * 1000,
        cacheTime: ttl,
        refetchOnWindowFocus: false,
    });

    // Using React Query to Fetch data from API endpoint
    const {
        data: covidData,
        isLoading,
        error,
    } = useQuery(useCovidDataQueryOptions());

    // const cachedData = queryClient.getQueryCache().getAll();

    // if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error?.message}</p>;

    // console.log("covidData", covidData);

    // Using useEffect hook to Fetch data from API endpoint
    // useEffect(() => {
    //     const cachedData: any = getSessionStorage("all-us-states-covid-data");

    //     if (cachedData && !cachedData?.value?.expiry) {
    //         setData(cachedData);
    //         return;
    //     }

    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             const response = await axios.get(
    //                 `${process.env.REACT_APP_SERVER_URL}/all-us-states-covid-data`
    //             );
    //             const results = await response.data;
    //             setSessionStorage(
    //                 "all-us-states-covid-data",
    //                 results.data,
    //                 ttl
    //             );
    //             setData(results.data);
    //         } catch (error) {
    //             setError(error as AxiosError);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    return (
        <div
            style={{
                marginLeft: "10px",
            }}
        >
            <StatesPopulation data={covidData} loading={isLoading} />
            <StatesVaccinationRatios data={covidData} loading={isLoading} />
            <Trends />
        </div>
    );
};

export default PageContent;
