import { lazy, useContext, useEffect } from "react";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../../helpers/sessionStorage";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { setRecentPageVisited } from "../../../../helpers/recentPageVisited";
import { ThemeContext } from "../../../../context/ThemeContext";

const StatesPopulation = lazy(() => import("./StatesPopulation"));

const ttl = 10 * 60 * 1000;

const CovidPageContent = () => {
    const { theme } = useContext(ThemeContext);

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

    const textColor = theme === "dark" ? "text-white" : "text-sky-950";

    useEffect(() => {
        const currentPath = window.location.pathname;
        setRecentPageVisited("recentPageVisited", {
            name: "Covid 19",
            url: currentPath,
        });
    }, []);

    return (
        <div className={`mt-5 ${textColor}`}>
            <StatesPopulation data={covidData} loading={isLoading} />
        </div>
    );
};

export default CovidPageContent;
