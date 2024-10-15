import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import { Typography } from "@mui/material";
import { StatesDashboardComponentsProps } from "../../../types";
import { GridValueOptionsParams } from "@mui/x-data-grid";

const StatesPopulation: React.FC<StatesDashboardComponentsProps> = ({
    data,
    loading,
}) => {
    const [pageSize, setPageSize] = useState<number>(10);

    // Table Columns configuration
    const columns = [
        {
            field: "state",
            headerName: "State",
        },
        {
            field: "population",
            headerName: "Population",
            width: 150,
        },
        {
            field: "cdcTransmissionLevel",
            headerName: "CDC Transmission Level",
            width: 200,
        },
        {
            field: "actuals.cases",
            headerName: "Covid Cases",
            width: 200,
            renderCell: (params: GridValueOptionsParams) => {
                return params.row.actuals?.cases ?? "N/A";
            },
        },
        {
            field: "actuals.deaths",
            headerName: "Deaths",
            width: 200,
            renderCell: (params: GridValueOptionsParams) => {
                return params.row.actuals?.deaths ?? "N/A";
            },
        },
    ];

    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                States Population
            </Typography>

            <Typography variant="body1">
                This table displays state-level population data, including
                information on CDC transmission levels, COVID-19 cases, and
                related deaths. Use this data to monitor and compare the impact
                of COVID-19 across different states.
            </Typography>
            <DataTable
                columns={columns}
                rows={data}
                pageSize={pageSize}
                loading={loading}
                height={300}
                // disablePageSizeOption={true}
                // width="300px"
            />
        </div>
    );
};

export default StatesPopulation;
