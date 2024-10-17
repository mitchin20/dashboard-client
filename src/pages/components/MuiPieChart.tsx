import React from "react";
import { PieChart } from "@mui/x-charts";
import { MuiPieChartProps } from "../../types";

const MuiPieChart: React.FC<MuiPieChartProps> = ({
    series,
    width,
    height,
    legendPositionV,
    legendPositionH,
    legendDirection,
    fontSize,
    padding,
}) => {
    return (
        <PieChart
            series={series}
            width={width}
            height={height}
            slotProps={{
                legend: {
                    direction: legendDirection || "column",
                    position: {
                        vertical: legendPositionV || "middle",
                        horizontal: legendPositionH || "right",
                    },
                    labelStyle: {
                        fontSize: fontSize || 10,
                    },
                    padding: padding,
                },
            }}
        />
    );
};

export default MuiPieChart;
