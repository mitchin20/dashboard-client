import React, { memo, useContext, useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from "@mui/material";
import { ThemeContext } from "../../../../context/ThemeContext";
import { CovidTrendsProps } from "../../../../types";

const CovidTrends: React.FC<CovidTrendsProps> = ({ covidTrendsData }) => {
    const { theme, winSize } = useContext(ThemeContext);
    const [extractedData, setExtractedData] = useState<object[]>([]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [originalDayLabels, setOriginalDayLabels] = useState<string[]>([]);
    const [filteredDayLabel, setFilteredDayLabel] = useState<string[]>([]);
    const [series, setSeries] = useState<object[]>([]);

    useEffect(() => {
        if (covidTrendsData) {
            const extractData = covidTrendsData.filter(
                (record: any) => record.cases !== null
            );
            setOriginalDayLabels(extractData.map((item: any) => item.date));
            setStartDate((extractData[0] as any).date);
            setEndDate((extractData[extractData.length - 1] as any).date);
            setExtractedData(extractData);
        }
    }, [covidTrendsData]);

    useEffect(() => {
        if (extractedData.length > 0 && startDate && endDate) {
            const filteredData = extractedData.filter((item: any) => {
                const itemDate = new Date(item.date);
                const start = new Date(startDate);
                const end = new Date(endDate);

                return itemDate >= start && itemDate <= end;
            });

            setFilteredDayLabel(filteredData.map((item: any) => item.date));
            setSeries([
                {
                    data: filteredData.map((item: any) => item.cases),
                    label: "Cases",
                    fill: "#8884d8",
                },
                {
                    data: filteredData.map((item: any) => item.deaths),
                    label: "Deaths",
                    fill: "#82ca9d",
                },
            ]);
        }
    }, [endDate, startDate, extractedData]);

    // Handle start date input change
    const handleStartDateChange = (event: SelectChangeEvent) => {
        setStartDate(event.target.value);
    };

    // Handle end date input change
    const handleEndDateChange = (event: SelectChangeEvent) => {
        setEndDate(event.target.value);
    };

    const xsScreen = winSize && winSize <= 768;
    const lgScreen = winSize && winSize >= 768;
    const textColor = theme === "dark" ? "white" : "black";

    return (
        <div className="mt-20 text-center">
            <h1 className="text-3xl xxs:text-2xl mb-8">Trends</h1>
            <p className="mb-8 xxs:text-sm">
                This COVID-19 data presents a comprehensive view of confirmed
                cases and deaths over time, providing insights into the spread
                and impact of the virus.
            </p>

            {/* 
                Filter control
                Allow user to filter data by State and date
            */}
            <div className="w-full grid grid-cols gap-y-5 justify-center items-center mt-5">
                <FormControl
                    size="small"
                    sx={{
                        width: xsScreen ? "100%" : "200px",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <InputLabel
                        sx={{
                            color: textColor,
                        }}
                    >
                        Start Date
                    </InputLabel>
                    <Select
                        id="select-start-date"
                        value={startDate}
                        label="State"
                        onChange={handleStartDateChange}
                        sx={{
                            color: textColor,
                        }}
                    >
                        {originalDayLabels.map((date, index) => (
                            <MenuItem key={index} value={date}>
                                {date}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl
                    size="small"
                    sx={{
                        width: xsScreen ? "100%" : "200px",
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    }}
                >
                    <InputLabel
                        sx={{
                            color: textColor,
                        }}
                    >
                        End Date
                    </InputLabel>
                    <Select
                        id="select-end-date"
                        value={endDate}
                        label="State"
                        onChange={handleEndDateChange}
                        sx={{
                            color: textColor,
                        }}
                    >
                        {originalDayLabels.map((date, index) => (
                            <MenuItem key={index} value={date}>
                                {date}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div className="w-full mx-auto">
                <LineChart
                    series={series}
                    xAxis={[
                        {
                            scaleType: "band",
                            data: filteredDayLabel,
                            tickLabelStyle: {
                                fontSize: xsScreen ? 9 : 16,
                                fill: textColor,
                            },
                        },
                    ]}
                    yAxis={[
                        {
                            tickLabelStyle: {
                                fontSize: xsScreen ? 9 : 16,
                                fill: textColor,
                            },
                        },
                    ]}
                    // loading={loading}
                    height={lgScreen ? 450 : 300}
                    grid={{ vertical: false, horizontal: true }}
                    tooltip={{
                        trigger: xsScreen ? "none" : "item",
                    }}
                    slotProps={{
                        legend: {
                            itemMarkHeight: xsScreen ? 15 : 25,
                            itemMarkWidth: xsScreen ? 15 : 25,
                            itemGap: 5,
                            labelStyle: {
                                fill: textColor,
                                fontSize: xsScreen ? 10 : 16,
                            },
                        },
                    }}
                    sx={{
                        padding: xsScreen ? 2 : 8,
                        marginLeft: 3,
                    }}
                />
            </div>
        </div>
    );
};

export default memo(CovidTrends);
