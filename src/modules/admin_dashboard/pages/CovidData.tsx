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

const CovidPageContent = lazy(
    () => import("../components/covid_components/CovidPageContent")
);

const CovidData = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <CovidPageContent />
        </QueryClientProvider>
    );
};

export default CovidData;
