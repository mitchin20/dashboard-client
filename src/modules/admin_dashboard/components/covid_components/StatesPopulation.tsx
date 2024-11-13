import React, { useContext, useEffect, useState } from "react";
import { StatesDashboardComponentsProps } from "../../../../types";
import {
    DataGrid,
    GridRowParams,
    GridToolbar,
    GridValueOptionsParams,
} from "@mui/x-data-grid";
import { ThemeContext } from "../../../../context/ThemeContext";
import StatePopulationDetails from "./StatePopulationDetails";

const StatesPopulation: React.FC<StatesDashboardComponentsProps> = ({
    data,
    loading,
}) => {
    const { theme } = useContext(ThemeContext);
    const [selectedData, setSelectedData] = useState<any>(null);
    const [winSize, setWinSize] = useState<number>(window.innerWidth);
    const [columnVisibilityModel, setColumnVisibilityModel] = useState<
        Record<string, boolean>
    >({
        cdcTransmissionLevel: winSize >= 768,
        "actuals.cases": winSize >= 768,
        "actuals.deaths": winSize >= 768,
    });

    const handleShowDetails = (params: GridRowParams) => {
        setSelectedData(params.row);
    };

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
    return (
        <div aria-hidden="true" className="text-center">
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

            {selectedData && Object.entries(selectedData).length > 0 && (
                <StatePopulationDetails data={selectedData} winSize={winSize} />
            )}
        </div>
    );
};

export default StatesPopulation;
