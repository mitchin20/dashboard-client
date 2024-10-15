import React, { useEffect, useState } from "react";
import axios from "axios";
import LineChart from "../../components/LineChart";
import {
    Typography,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    SelectChangeEvent,
    Grid2,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material";
import { AxiosError } from "axios";
import { usStateAbbreviations } from "./varData";
import {
    setSessionStorage,
    getSessionStorage,
} from "../../../helpers/sessionStorage";

const filterTypes = ["Days", "Months"];
const ttl = 3 * 60 * 1000; // 3 minutes in milliseconds

const Trends = () => {
    const [extractedData, setExtractedData] = useState<object[]>([]);
    const [filteredExtractedData, setFilteredExtractedData] = useState<
        object[]
    >([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<AxiosError | null>(null);
    const [input, setInput] = useState<string>(usStateAbbreviations[0]);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<string>("Days");
    const [dayLabels, setDayLabels] = useState<string[]>([]);
    const [series, setSeries] = useState<object[]>([]);

    useEffect(() => {
        const cachedData: any = getSessionStorage(
            `state-metrics-timeseries-${input}`
        );
        if (cachedData && !cachedData?.value?.expiry) {
            setExtractedData(cachedData);
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/state-metrics-timeseries/${input}`
                );

                const extractData = response.data.data.filter(
                    (item: any) => item.cases !== null
                );
                setStartDate((extractData[0] as any).date);
                setEndDate((extractData[extractData.length - 1] as any).date);
                setExtractedData(extractData);

                setSessionStorage(
                    `state-metrics-timeseries-${input}`,
                    extractData,
                    ttl
                );
            } catch (error) {
                setError(error as AxiosError);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [input]);

    useEffect(() => {
        if (extractedData.length > 0) {
            let filteredData = extractedData;

            switch (typeFilter) {
                case "Days":
                    break;

                case "Months":
                    // Filter data to get only the first day of each month
                    filteredData = extractedData.filter((item: any) => {
                        const date = item.date.split("-");
                        return date[2] === "01";
                    });
                    break;

                default:
                    filteredData = [];
                    break;
            }

            setFilteredExtractedData(filteredData);

            if (filteredData.length > 0) {
                setStartDate((filteredData[0] as any).date);
                setEndDate((filteredData[filteredData.length - 1] as any).date);
            }
        }
    }, [extractedData, typeFilter]);

    useEffect(() => {
        if (filteredExtractedData.length > 0 && startDate && endDate) {
            const filteredData = filteredExtractedData.filter((item: any) => {
                const itemDate = new Date(item.date);
                const start = new Date(startDate);
                const end = new Date(endDate);

                return itemDate >= start && itemDate <= end;
            });

            setDayLabels(filteredData.map((item: any) => item.date));
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
    }, [endDate, startDate, filteredExtractedData]);

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    // Handle state input change
    const handleStateChange = (event: SelectChangeEvent) => {
        setInput(event.target.value as string);
    };

    // Handle start date input change
    const handleStartDateChange = (event: SelectChangeEvent) => {
        setStartDate(event.target.value);
    };

    // Handle end date input change
    const handleEndDateChange = (event: SelectChangeEvent) => {
        setEndDate(event.target.value);
    };

    // Handle filter type input change
    const handleFilterTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setTypeFilter((event.target as HTMLInputElement).value);
    };

    return (
        <div
            style={{
                marginLeft: "20px",
                marginBottom: "50px",
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "100px",
                    marginBottom: "20px",
                    fontWeight: "bold",
                }}
            >
                Trends
            </Typography>
            <Typography
                variant="body1"
                textAlign="center"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginBottom: "50px",
                    marginLeft: "20%",
                    marginRight: "20%",
                }}
            >
                This COVID-19 data presents a comprehensive view of confirmed
                cases and deaths over time, providing insights into the spread
                and impact of the virus.
            </Typography>

            <Grid2
                container
                spacing={4}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "50px",
                }}
            >
                <Grid2>
                    <FormControl
                        size="small"
                        sx={{
                            width: "150px",
                        }}
                    >
                        <InputLabel>State</InputLabel>
                        <Select
                            id="select-state"
                            value={input}
                            label="State"
                            onChange={handleStateChange}
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            {usStateAbbreviations.map((state, index) => (
                                <MenuItem key={index} value={state}>
                                    {state}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2>
                    <FormControl size="small">
                        <RadioGroup
                            row
                            value={typeFilter}
                            onChange={handleFilterTypeChange}
                        >
                            {filterTypes.map((item, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={item}
                                    control={<Radio />}
                                    label={item}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Grid2>
                <Grid2>
                    <FormControl
                        size="small"
                        sx={{
                            width: "200px",
                        }}
                    >
                        <InputLabel>Start Date</InputLabel>
                        <Select
                            id="select-start-date"
                            value={startDate}
                            label="State"
                            onChange={handleStartDateChange}
                        >
                            {dayLabels.map((date, index) => (
                                <MenuItem key={index} value={date}>
                                    {date}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
                <Grid2>
                    <FormControl
                        size="small"
                        sx={{
                            width: "200px",
                        }}
                    >
                        <InputLabel>End Date</InputLabel>
                        <Select
                            id="select-end-date"
                            value={endDate}
                            label="State"
                            onChange={handleEndDateChange}
                        >
                            {dayLabels.map((date, index) => (
                                <MenuItem key={index} value={date}>
                                    {date}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid2>
            </Grid2>

            <LineChart
                series={series}
                scaleType="band"
                labels={dayLabels}
                loading={loading}
                props={{
                    padding: "10px",
                }}
            />
        </div>
    );
};

export default Trends;
