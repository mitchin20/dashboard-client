import React from "react";
import { BarChart as MuiBarChart } from "@mui/x-charts";
import { BarChartProps } from "../../types";

const BarChart: React.FC<BarChartProps> = ({
    dataset,
    series,
    height,
    chartSetting,
    loading,
    layout,
    width,
}) => {
    return (
        <MuiBarChart
            dataset={dataset}
            series={series}
            height={height || 300}
            loading={loading}
            layout={layout}
            {...chartSetting}
        />
    );
};

export default BarChart;
