import React, { useState } from "react";
import DataTable from "../../../components/DataTable";
import { Typography } from "@mui/material";
import { StatesDashboardComponentsProps } from "../../../../types";
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
        <div
            style={{
                marginBottom: "50px",
            }}
        >
            <Typography
                variant="h4"
                textAlign="center"
                sx={{
                    marginTop: "100px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                }}
            >
                States Population
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    marginLeft: "20%",
                    marginRight: "20%",
                    textAlign: "center",
                    marginBottom: "50px",
                }}
            >
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
                props={{
                    paddingLeft: "20%",
                    paddingRight: "20%",
                }}
            />
        </div>
    );
};

export default StatesPopulation;
