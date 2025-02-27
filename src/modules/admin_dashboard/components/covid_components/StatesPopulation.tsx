import {
    lazy,
    memo,
    Suspense,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    DataGrid,
    GridRowParams,
    GridToolbar,
    GridValueOptionsParams,
} from "@mui/x-data-grid";
import { ThemeContext } from "../../../../context/ThemeContext";
import { setRecentPageVisited } from "../../../../helpers/recentPageVisited";
import { queryUsStatesCovidData } from "../../utils/queryUsStatesCovidData";
import { queryCovidTrendsData } from "../../utils/queryCovidTrendsData";

const StatePopulationDetails = lazy(() => import("./StatePopulationDetails"));
const CovidTrends = lazy(() => import("./CovidTrends"));

const StatesPopulation = () => {
    const { theme, winSize } = useContext(ThemeContext);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [covidTrendsData, setCovidTrendsData] = useState<any>(null);
    const [detailsVisible, setDetailsVisible] = useState<boolean>(false);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<
        Record<string, boolean>
    >({
        cdcTransmissionLevel: winSize >= 768,
        "actuals.cases": winSize >= 768,
        "actuals.deaths": winSize >= 768,
    });

    useEffect(() => {
        queryUsStatesCovidData({ setData, setLoading });
    }, []);

    // Fetch CovidTrends data
    useEffect(() => {
        queryCovidTrendsData({ selectedData, setCovidTrendsData });
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
        setColumnVisibilityModel({
            cdcTransmissionLevel: winSize >= 768,
            "actuals.cases": winSize >= 768,
            "actuals.deaths": winSize >= 768,
        });
    }, [winSize]);

    useEffect(() => {
        const currentPath = window.location.pathname;
        setRecentPageVisited("recentPageVisited", {
            name: "States-Covid19",
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

            {detailsVisible && memoizedSelectedData ? (
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
                )
            ) : (
                <div className="my-10 w-[100%] md:w-[50%] mx-auto text-sm xxs:text-xs">
                    <p>
                        The COVID-19 metrics reflect various aspects of the
                        pandemic's impact, including the level of community
                        transmission, healthcare capacity, and the effectiveness
                        of contact tracing efforts. These data points help
                        assess the current risk level, healthcare strain, and
                        readiness of public health systems to manage the ongoing
                        situation. Tracking positivity rates, case density,
                        hospital and ICU usage, as well as infection trends,
                        provides a comprehensive view of the pandemic’s evolving
                        dynamics in each state.
                    </p>
                    <p className="my-3">
                        Select a state from the table to view more details.
                    </p>
                </div>
            )}
        </div>
    );
};

export default memo(StatesPopulation);
