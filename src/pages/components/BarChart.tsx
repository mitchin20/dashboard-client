import React from "react";
import { BarChart as MuiBarChart } from "@mui/x-charts";
import { BarChartProps } from "../../types";

const BarChart: React.FC<BarChartProps> = ({
    dataKey,
    dataset,
    series,
    height,
    width,
    chartSetting,
    loading,
}) => {
    return (
        <MuiBarChart
            xAxis={[{ scaleType: "band", dataKey: dataKey }]}
            dataset={dataset}
            series={series}
            height={height || 300}
            {...chartSetting}
            loading={loading}
            sx={{
                width: width || "100%",
                marginLeft: "20px",
            }}
        />
    );
};

export default BarChart;
