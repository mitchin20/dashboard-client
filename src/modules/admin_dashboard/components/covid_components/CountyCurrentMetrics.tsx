import React, { memo, useContext } from "react";
import { CountyMetricsProps } from "../../../../types";
import { getObjectFields } from "../../../../helpers/getObjectFields";
import LinearProgress from "@mui/material/LinearProgress";
import InfoIcon from "../../../../svgIcons/InfoIcon";
import Tooltip from "../../../components/Tooltip";
import { ThemeContext } from "../../../../context/ThemeContext";

const CountyCurrentMetrics: React.FC<CountyMetricsProps> = ({
    data,
    loading,
}) => {
    const { theme } = useContext(ThemeContext);
    if (loading) {
        return <div>Loading...</div>;
    }

    const metricsFields = [
        "bedsWithCovidPatientsRatio",
        "icuCapacityRatio",
        "vaccinationsInitiatedRatio",
        "vaccinationsCompletedRatio",
        "vaccinationsAdditionalDoseRatio",
    ];

    const metricsData = getObjectFields(data.metrics, metricsFields);
    const riskLevel = data.riskLevels.overall;

    const tartgetValue = (value: number) => {
        return value * 100;
    };

    const initialMetricName = (value: string) => {
        return value
            .split(/(?=[A-Z])/)
            .map((word: string) => word.charAt(0).toUpperCase())
            .join("");
    };

    const upperCaseMetricName = (value: string) => {
        return value
            .split(/(?=[A-Z])/)
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    };

    const textColor = theme === "dark" ? "text-cyan-400" : "text-cyan-600";

    return (
        <div className="flex flex-col gap-y-3 mt-10">
            <div className="pl-2 bg-white-gradient-conic xxs:text-sm font-bold">
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-10 text-[#4a90e2]">
                        Overall Risk Level
                    </div>
                    <div className="col-span-2 text-center bg-red-400 p-2 hover:bg-red-300">
                        {riskLevel || "N/A"}
                    </div>
                </div>
                <div className="grid grid-cols-12 items-center">
                    <div className="col-span-10 text-[#4a90e2]">
                        Weekly Covid Admission Per 100k{" "}
                    </div>
                    <div className="col-span-2 text-center bg-red-400 p-2 hover:bg-red-300">
                        {data.metrics.weeklyCovidAdmissionsPer100k || "N/A"}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-3 p-2">
                {Object.entries(metricsData).map((met: any, index) => (
                    <div key={index}>
                        <div className="flex justify-between items-center mb-2 text-sm">
                            <p className={`${textColor}`}>
                                {initialMetricName(met[0])}
                            </p>
                            <Tooltip
                                content={upperCaseMetricName(met[0])}
                                position="left"
                                className="w-64"
                            >
                                <InfoIcon className="w-3 h-3 ml-5" />
                            </Tooltip>
                        </div>
                        <div className="relative">
                            <LinearProgress
                                variant="determinate"
                                value={tartgetValue(Number(met[1]))}
                                color="error"
                                sx={{
                                    height: 10,
                                    borderRadius: 5,
                                    backgroundColor: "#99f6e4",
                                }}
                            />
                            <p className="text-xs text-center">
                                {tartgetValue(Number(met[1])).toFixed(1)}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(CountyCurrentMetrics);
