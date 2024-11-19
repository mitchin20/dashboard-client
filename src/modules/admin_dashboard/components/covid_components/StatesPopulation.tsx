import React, {
    lazy,
    memo,
    Suspense,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import { StatesDashboardComponentsProps } from "../../../../types";
import {
    DataGrid,
    GridRowParams,
    GridToolbar,
    GridValueOptionsParams,
} from "@mui/x-data-grid";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../../helpers/sessionStorage";
import axios from "axios";
import { setRecentPageVisited } from "../../../../helpers/recentPageVisited";

const StatePopulationDetails = lazy(() => import("./StatePopulationDetails"));
const CovidTrends = lazy(() => import("./CovidTrends"));

const ttl = 10 * 60 * 1000;

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

console.log("API URL: ", API_URL);

const StatesPopulation = () => {
    const { theme } = useContext(ThemeContext);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [covidTrendsData, setCovidTrendsData] = useState<any>(null);
    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
    const [winSize, setWinSize] = useState<number>(window.innerWidth);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<
        Record<string, boolean>
    >({
        cdcTransmissionLevel: winSize >= 768,
        "actuals.cases": winSize >= 768,
        "actuals.deaths": winSize >= 768,
    });

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            // local cache if page refreshing
            const cachedData: any = getSessionStorage("all-states-covid-data");
            if (cachedData) {
                // return cachedData;
                setData(cachedData);
            }

            try {
                const response = await axios.get(
                    `${API_URL}/all-us-states-covid-data`
                );

                if (Array.isArray(response.data.data)) {
                    setSessionStorage(
                        "all-states-covid-data",
                        response.data.data,
                        ttl
                    );
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

        fetchData();
    }, []);

    // Fetch CovidTrends data
    useEffect(() => {
        if (selectedData) {
            const cachedTrendsData: any = getSessionStorage(
                `covid-trends-${selectedData.state}`
            );
            if (cachedTrendsData) {
                setCovidTrendsData(cachedTrendsData);
                return;
            }

            const fetchCovidTrendsData = async () => {
                try {
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

            fetchCovidTrendsData();
        }
    }, [selectedData]);

    const handleShowDetails = (params: GridRowParams) => {
        setSelectedData(params.row);
        setDetailsVisible(true);
    };

    // Memoize selectedData to prevent unnecessary re-renders
    const memoizedSelectedData = useMemo(() => selectedData, [selectedData]);

    // Table Columns configuration
    const columns = [
        {
            field: "state",
            headerName: "State",
            flex: 1,
        },
        {
            field: "population",
            headerName: "Population",
            flex: 1,
        },
        {
            field: "cdcTransmissionLevel",
            headerName: "CDC Transmission Level",
            flex: 1,
        },
        {
            field: "actuals.cases",
            headerName: "Covid Cases",
            renderCell: (params: GridValueOptionsParams) => {
                return params.row.actuals?.cases ?? "N/A";
            },
            flex: 1,
        },
        {
            field: "actuals.deaths",
            headerName: "Deaths",
            renderCell: (params: GridValueOptionsParams) => {
                return params.row.actuals?.deaths ?? "N/A";
            },
            flex: 1,
        },
    ];

    useEffect(() => {
        const handleResize = () => {
            const newWinSize = window.innerWidth;
            setWinSize(newWinSize);
            // Update column visibility based on new window size
            setColumnVisibilityModel({
                cdcTransmissionLevel: newWinSize >= 768,
                "actuals.cases": newWinSize >= 768,
                "actuals.deaths": newWinSize >= 768,
            });
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const currentPath = window.location.pathname;
        setRecentPageVisited("recentPageVisited", {
            name: "Covid-19",
            url: currentPath,
        });
    }, []);

    const textColor = theme === "dark" ? "text-white" : "text-black";
    return (
        <div aria-hidden="true" className={`text-center ${textColor}`}>
            <h1 className="text-3xl xxs:text-2xl my-8">States Population</h1>
            <p className="xxs:text-sm my-8">
                This table displays state-level population data, including
                information on CDC transmission levels, COVID-19 cases, and
                related deaths. Use this data to monitor and compare the impact
                of COVID-19 across different states.
            </p>
            <div className="flex justify-center items-center mx-auto h-[500px] w-full">
                <DataGrid
                    columns={columns}
                    rows={data}
                    loading={loading}
                    disableRowSelectionOnClick={true}
                    slots={{ toolbar: GridToolbar }}
                    onRowClick={handleShowDetails}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    columnVisibilityModel={columnVisibilityModel}
                    sx={{
                        "*": {
                            color: theme === "dark" ? "white" : "black",
                        },
                        "& .MuiDataGrid-root": {
                            backgroundColor:
                                theme === "dark" ? "#121212" : "#ffffff",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom:
                                theme === "dark"
                                    ? "1px solid #333"
                                    : "1px solid #ccc",
                        },
                        "& .MuiDataGrid-columnHeader": {
                            backgroundColor:
                                theme === "dark" ? "#27272a" : "#d4d4d8",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor:
                                theme === "dark" ? "#1e1e1e" : "#f5f5f5",
                        },
                        "& .MuiDataGrid-row:hover": {
                            backgroundColor:
                                theme === "dark" ? "#2a2a2a" : "#f0f0f0",
                        },
                        "& .MuiDataGrid-toolbarContainer": {
                            backgroundColor:
                                theme === "dark" ? "#1e1e1e" : "#f5f5f5",
                            "*": {
                                color: theme === "dark" ? "white" : "black",
                            },
                        },
                    }}
                />
            </div>

            <div className="my-10 w-[100%] md:w-[50%] mx-auto text-sm xxs:text-xs">
                <p>
                    The COVID-19 metrics reflect various aspects of the
                    pandemic's impact, including the level of community
                    transmission, healthcare capacity, and the effectiveness of
                    contact tracing efforts. These data points help assess the
                    current risk level, healthcare strain, and readiness of
                    public health systems to manage the ongoing situation.
                    Tracking positivity rates, case density, hospital and ICU
                    usage, as well as infection trends, provides a comprehensive
                    view of the pandemic’s evolving dynamics in each state.
                </p>
                <p className="my-3">
                    Select a state from the table to view more details.
                </p>
            </div>

            {detailsVisible &&
                memoizedSelectedData &&
                Object.entries(memoizedSelectedData).length > 0 && (
                    <Suspense fallback={<div>Loading details...</div>}>
                        <StatePopulationDetails
                            data={memoizedSelectedData}
                            winSize={winSize}
                        >
                            <Suspense fallback={<div>Loading trends...</div>}>
                                {covidTrendsData && (
                                    <CovidTrends
                                        covidTrendsData={covidTrendsData}
                                    />
                                )}
                            </Suspense>
                        </StatePopulationDetails>
                    </Suspense>
                )}
        </div>
    );
};

export default memo(StatesPopulation);
