import React from "react";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DataTableProps } from "../../types";

const DataTable: React.FC<DataTableProps> = ({
    columns,
    rows,
    pageSize = 5,
    loading,
    height,
    width,
    disablePageSizeOption,
    onRowClick,
    props,
}) => {
    return (
        <Box
            sx={{
                height: height || 400,
                width: width || "100%",
                ...props,
            }}
        >
            <DataGrid
                columns={columns}
                rows={rows}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: pageSize || 5,
                        },
                    },
                }}
                onRowClick={onRowClick}
                pageSizeOptions={
                    disablePageSizeOption
                        ? []
                        : Array.from(new Set([5, 10, 20, pageSize]))
                }
                disableRowSelectionOnClick={true}
                loading={loading}
            />
        </Box>
    );
};

export default DataTable;
