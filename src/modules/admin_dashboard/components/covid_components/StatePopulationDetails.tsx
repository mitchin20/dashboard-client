import React, { lazy, useContext } from "react";
import { StatePopulationDetailsProps } from "../../../../types";
import Card2 from "../../../components/Card2";
import CardHeader from "../../../components/CardHeader";
import CardContent from "../../../components/CardContent";
import Link from "../../../components/Link";
import { BarChart, PieChart } from "@mui/x-charts";
import { ThemeContext } from "../../../../context/ThemeContext";

const CovidTrends = lazy(() => import("./CovidTrends"));

const extractObjKeysAndValues = (
    data: any,
    allowedKeys: string[],
    formatValue?: boolean
): any[] => {
    return Object.entries(data ?? {})
        .map(([key, value]) => {
            if (allowedKeys.includes(key) && formatValue) {
                return {
                    key: key
                        .split(/(?=[A-Z])/)
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase(),
                    name: key
                        .split(/(?=[A-Z])/)
                        .join(" ")
                        .toUpperCase(),
                    value: (value ?? (0 as any)) * 100,
                };
            }
            if (allowedKeys.includes(key) && !formatValue) {
                return {
                    label: key
                        .split(/(?=[A-Z])/)
                        .map((word) => word.charAt(0))
                        .join("")
                        .toUpperCase(),
                    name: key
                        .split(/(?=[A-Z])/)
                        .join(" ")
                        .toUpperCase(),
                    value: value ?? (0 as any),
                };
            }
            return null;
        })
        .filter(Boolean);
};

const StatePopulationDetails: React.FC<StatePopulationDetailsProps> = ({
    data,
    winSize,
}) => {
    const { theme } = useContext(ThemeContext);
    const icuBedsKeys = ["capacity", "currentUsageTotal", "currentUsageCovid"];
    const stateIcuBeds = extractObjKeysAndValues(
        data?.actuals?.icuBeds,
        icuBedsKeys,
        false
    );

    const stateRiskLevelsKeys = [
        "overall",
        "testPositivityRatio",
        "caseDensity",
        "contactTracerCapacityRatio",
        "infectionRate",
        "icuCapacityRatio",
    ];
    const stateRiskLevel = extractObjKeysAndValues(
        data?.riskLevels,
        stateRiskLevelsKeys,
        false
    );

    const stateMetricsKeys = [
        "testPositivityRatio",
        "vaccinationsInitiatedRatio",
        "vaccinationsCompletedRatio",
        "vaccinationsFall2022BivalentBoosterRatio",
        "vaccinationsAdditionalDoseRatio",
    ];
    const stateMetrics = extractObjKeysAndValues(
        data?.metrics,
        stateMetricsKeys,
        true
    );

    const stateVaccinationDosesKeys = [
        "vaccinesDistributed",
        "vaccinationsInitiated",
        "vaccinationsCompleted",
        "vaccinationsAdditionalDose",
        "vaccinationsFall2022BivalentBooster",
        "vaccinesAdministered",
    ];
    const stateVaccinationDoses = extractObjKeysAndValues(
        data?.actuals,
        stateVaccinationDosesKeys,
        false
    );

    const valueFormatter = (value: number | null) => {
        if (value === null) return "0%";
        return `${Math.round((value + Number.EPSILON) * 100) / 100}%`;
    };

    // BarChart Series data key
    const series = [
        {
            dataKey: "value",
            label: "Vaccination",
            valueFormatter,
            color: theme === "dark" ? "#ffffff" : "#f43f5e",
        },
    ];

    return (
        <Card2 className="my-8 p-1">
            <CardHeader>
                {data.state.toUpperCase()} - {data.country.toUpperCase()} -
                Covid details
                <p className="text-xs mt-2">Data collected from</p>
                <p>
                    <Link href={data.url} target="_blank" className="text-xs">
                        {data.url}
                    </Link>
                </p>
            </CardHeader>
            <CardContent>
                <div className="h-[400px] my-10">
                    <BarChart
                        dataset={stateMetrics}
                        series={series}
                        // colors={["#f43f5e"]}
                        xAxis={[
                            {
                                dataKey: "key",
                                label: "Metrics",
                                scaleType: "band",
                                tickFontSize:
                                    winSize && winSize <= 768 ? 8 : 12,
                                labelStyle: {
                                    fill: theme === "dark" ? "white" : "black",
                                },
                                tickLabelStyle: {
                                    fill: theme === "dark" ? "white" : "black",
                                },
                            },
                        ]}
                        yAxis={[
                            {
                                dataKey: "value",
                                labelStyle: {
                                    fill: "white",
                                },
                                tickLabelStyle: {
                                    fill: theme === "dark" ? "white" : "black",
                                },
                            },
                        ]}
                        tooltip={{
                            trigger:
                                winSize && winSize <= 768 ? "none" : "axis",
                        }}
                        barLabel={(data: any) => `${data.value.toFixed(2)}%`}
                        sx={{
                            "& .MuiBarLabel-root": {
                                fill: theme === "dark" ? "#e11d48" : "black",
                                fontSize: winSize && winSize <= 768 ? 9 : 12,
                            },
                            "& .MuiChartsLegend-root": {
                                fill:
                                    theme === "dark"
                                        ? "white !important"
                                        : "black !important",
                            },
                        }}
                    />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 xxs:text-xs sm:text-sm text-base">
                    {Object.entries({
                        "Updated on": data.lastUpdatedDate || "N/A",
                        Population: data.population,
                        "STATE - Location ID": data.locationId,
                        "HSA - Population": data.hsaPopulation || "N/A",
                        "CDC - Transmission Level":
                            data.cdcTransmissionLevel || "N/A",
                        Cases: data.actuals?.cases || "N/A",
                        Deaths: data.actuals?.deaths || "N/A",
                        "New Cases": data.actuals?.newCases || "N/A",
                        "New Deaths": data.actuals?.newDeaths || "N/A",
                        "Positive Tests": data.actuals?.positiveTests || "N/A",
                        "Negative Tests": data.actuals?.negativeTests || "N/A",
                        "Contact Tracers":
                            data.actuals?.contactTracers || "N/A",
                    }).map(([label, value]) => (
                        <div
                            key={label}
                            className="hover:shadow-sm hover:shadow-gray-700 p-1 rounded-md transform duration-500"
                        >
                            <h6>{label}</h6>
                            <p>{value}</p>
                        </div>
                    ))}
                </div>

                {stateVaccinationDoses && stateVaccinationDoses.length > 0 && (
                    <div className="w-full mt-10">
                        <PieChart
                            series={[{ data: stateVaccinationDoses }]}
                            height={300}
                            tooltip={{
                                trigger:
                                    winSize && winSize <= 768 ? "none" : "item",
                            }}
                            slotProps={{
                                legend: {
                                    direction: "column",
                                    position: {
                                        vertical: "middle",
                                        horizontal: "right",
                                    },
                                    itemMarkHeight:
                                        winSize && winSize <= 768 ? 10 : 20,
                                    itemMarkWidth:
                                        winSize && winSize <= 768 ? 10 : 20,
                                    itemGap: 5,
                                    labelStyle: {
                                        fill:
                                            theme === "dark"
                                                ? "white"
                                                : "black",
                                        fontSize: 10,
                                    },
                                },
                            }}
                        />

                        {winSize && winSize <= 768 && (
                            <div>
                                {stateVaccinationDoses.map(
                                    (vacc: any, index: number) => (
                                        <div
                                            key={index}
                                            className="text-xs flex text-left justify-between py-1 animate-slideIn"
                                        >
                                            <p>{vacc.name}</p>
                                            <p>{vacc.value}</p>
                                        </div>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xxs:text-xs xs:text-sm mt-10">
                    <div className="text-left p-1">
                        {stateRiskLevel &&
                            stateRiskLevel.length > 0 &&
                            stateRiskLevel.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex justify-between w-full mb-2"
                                >
                                    <p>{item.name}</p>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                    </div>

                    <div className="text-left p-1">
                        {stateIcuBeds &&
                            stateIcuBeds.length > 0 &&
                            stateIcuBeds.map((item: any, index: number) => (
                                <div
                                    key={index}
                                    className="flex justify-between w-full mb-2"
                                >
                                    <p>{item.name}</p>
                                    <p>{item.value}</p>
                                </div>
                            ))}
                    </div>
                </div>

                <CovidTrends selectedState={data.state} />
            </CardContent>
        </Card2>
    );
};

export default StatePopulationDetails;
