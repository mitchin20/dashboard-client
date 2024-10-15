import React from "react";
import { StatesDashboardComponentsProps } from "../../../types";
import { Typography } from "@mui/material";
import { axisClasses } from "@mui/x-charts";
import BarChart from "../../components/BarChart";

const StatesVaccinationRatios: React.FC<StatesDashboardComponentsProps> = ({
    data,
    loading,
}) => {
    // Bar chart data configuration
    // Extract & transform data for the bar chart
    const barChartData = () => {
        return data.map((item) => ({
            state: item.state,
            vaccinationInitiated:
                (item.metrics.vaccinationsInitiatedRatio ?? 0) * 100,
            vaccinationCompleted:
                (item.metrics.vaccinationsCompletedRatio ?? 0) * 100,
            additionalDose:
                (item.metrics.vaccinationsAdditionalDoseRatio ?? 0) * 100,
            fall2022BivalentBooster:
                (item.metrics.vaccinationsFall2022BivalentBoosterRatio ?? 0) *
                100,
        }));
    };

    const valueFormatter = (value: number | null) => {
        if (value === null) return 0;
        return `${Math.round((value + Number.EPSILON) * 100) / 100}%`;
    };
    // Series data key
    const series = [
        {
            dataKey: "vaccinationInitiated",
            label: "Vaccination Initiated %",
            valueFormatter,
        },
        {
            dataKey: "vaccinationCompleted",
            label: "Vaccination Completed %",
            valueFormatter,
        },
        {
            dataKey: "additionalDose",
            label: "Additional Dose %",
            valueFormatter,
        },
        {
            dataKey: "fall2022BivalentBooster",
            label: "Fall 2022 Bivalent Booster %",
            valueFormatter,
        },
    ];

    const chartSetting = {
        yAxis: [
            {
                label: "Vaccination Coverage (%)",
            },
        ],
        sx: {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-20px, 0)",
            },
        },
    };
    return (
        <div>
            <Typography
                variant="h5"
                sx={{
                    marginTop: "20px",
                    marginBottom: "20px",
                }}
            >
                States Vaccination Ratios
            </Typography>
            <BarChart
                dataKey="state"
                dataset={barChartData()}
                series={series}
                height={500}
                chartSetting={chartSetting}
                loading={loading}
            />
        </div>
    );
};

export default StatesVaccinationRatios;
