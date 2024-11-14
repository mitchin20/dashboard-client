import { lazy } from "react";
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
} from "@tanstack/react-query";

// Create query cache instance
const queryCache = new QueryCache();

// Create query client instance
const queryClient = new QueryClient({ queryCache });

const StatesPopulation = lazy(
    () => import("../components/covid_components/StatesPopulation")
);

const CovidData = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <StatesPopulation />
        </QueryClientProvider>
    );
};

export default CovidData;
