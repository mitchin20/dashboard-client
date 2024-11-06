import React from "react";
import { LineChart as MuiLineChart } from "@mui/x-charts";

interface LineChartProps {
    labels: string[];
    series: object[];
    scaleType?: string | any;
    height?: number;
    width?: string;
    loading?: boolean;
    props?: any;
}

const LineChart: React.FC<LineChartProps> = ({
    labels,
    series,
    scaleType,
    height,
    width,
    loading,
    props,
}) => {
    return (
        <MuiLineChart
            series={series}
            xAxis={[{ scaleType: scaleType || "time", data: labels }]}
            height={height || 300}
            loading={loading}
            grid={{ vertical: false, horizontal: true }}
            sx={{
                width: width || "100%",
                ...props,
            }}
        />
    );
};

export default LineChart;
