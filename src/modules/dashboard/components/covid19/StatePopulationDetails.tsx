import React from "react";
import MuiDrawer from "../../../components/MuiDrawer";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Grid2,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { StatePopulationDetailsProps } from "../../../../types";
import BarChart from "../../../components/BarChart";
import MuiPieChart from "../../../components/MuiPieChart";

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
                        .join(" ")
                        .toUpperCase(),
                    value: (value ?? (0 as any)) * 100,
                };
            }
            if (allowedKeys.includes(key) && !formatValue) {
                return {
                    label: key
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
    showDrawer,
    handleCloseDrawer,
}) => {
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
        if (value === null) return 0;
        return `${Math.round((value + Number.EPSILON) * 100) / 100}%`;
    };

    // BarChart Series data key
    const series = [
        {
            dataKey: "value",
            label: "Vaccination",
            valueFormatter,
        },
    ];

    // BarChart setting data key
    const chartSetting = {
        xAxis: [
            {
                label: "Vaccination Coverage (%)",
            },
        ],
        yAxis: [
            {
                dataKey: "key",
                scaleType: "band",
                position: "left",
            },
        ],
        margin: {
            left: 400,
        },
    };

    // PiChart Series
    const pieSeries = [
        {
            data: stateVaccinationDoses,
        },
    ];
    return (
        data && (
            <MuiDrawer
                anchor="right"
                open={showDrawer}
                onClose={handleCloseDrawer}
                PaperProps={{
                    sx: {
                        width: "90%",
                        padding: "20px",
                    },
                }}
            >
                <IconButton
                    onClick={handleCloseDrawer}
                    sx={{
                        background: "linear-gradient(90deg, #ffcccb, #add8e6)",
                        padding: 0.5,
                        borderRadius: "30%",
                        border: "2px solid white",
                        color: "white",
                        "&:hover": {
                            background:
                                "linear-gradient(90deg, #87CEFA, #FFA07A)",
                        },
                        marginBottom: "30px",
                    }}
                >
                    <Close
                        sx={{
                            background: "linear-gradient(90deg, red, blue)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: 40,
                        }}
                    />
                </IconButton>

                {/* State Covid information */}
                <Grid2 container flexDirection="column" spacing={2}>
                    <Grid2 container flexDirection="row" spacing={2}>
                        <Grid2 size={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    border: "1px solid gray",
                                    borderRadius: "50px",
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={`State - ${data.state.toUpperCase()}`}
                                            secondary={`Country - ${data.country}`}
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${data.level.toUpperCase()} - Location ID`}
                                            secondary={data.locationId}
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid2>
                        <Grid2 size={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    border: "1px solid gray",
                                    borderRadius: "50px",
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={data.population}
                                            secondary="POPULATION"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data.hsaPopulation || "N/A"
                                            }
                                            secondary="HSA - POPULATION"
                                            sx={{
                                                marginRight: "50px",
                                            }}
                                        />
                                        <ListItemText
                                            primary={
                                                data.cdcTransmissionLevel ||
                                                "N/A"
                                            }
                                            secondary="CDC - Transmission Level"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid2>
                        <Grid2 size={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    border: "1px solid gray",
                                    borderRadius: "50px",
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data.lastUpdatedDate || "N/A"
                                            }
                                            secondary="LAST UPDATED"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={data.url || "N/A"}
                                            secondary="URL"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid2>
                    </Grid2>

                    <Grid2 container flexDirection="row" spacing={2}>
                        <Grid2 size={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    border: "1px solid gray",
                                    borderRadius: "50px",
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data?.actuals?.cases || "N/A"
                                            }
                                            secondary="CASES"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data?.actuals?.deaths || "N/A"
                                            }
                                            secondary="DEATHS"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid2>
                        <Grid2 size={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    border: "1px solid gray",
                                    borderRadius: "50px",
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data?.actuals?.newCases || "N/A"
                                            }
                                            secondary="NEW CASES"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data?.actuals?.newDeaths ||
                                                "N/A"
                                            }
                                            secondary="NEW DEATHS"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid2>
                        <Grid2 size={4}>
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    border: "1px solid gray",
                                    borderRadius: "50px",
                                }}
                            >
                                <List>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data?.actuals?.positiveTests ||
                                                "N/A"
                                            }
                                            secondary="POSITIVE TESTS"
                                        />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText
                                            primary={
                                                data?.actuals?.negativeTests ||
                                                "N/A"
                                            }
                                            secondary="NEGATIVE TESTS"
                                            sx={{
                                                marginRight: "50px",
                                            }}
                                        />
                                        <ListItemText
                                            primary={
                                                data?.actuals?.contactTracers ||
                                                "N/A"
                                            }
                                            secondary="CONTACT TRACERS"
                                        />
                                    </ListItem>
                                </List>
                            </Box>
                        </Grid2>
                    </Grid2>
                </Grid2>

                {/* Metrics */}
                {stateMetrics && (
                    <Box
                        sx={{
                            width: "100%",
                            marginTop: "50px",
                            border: "1px solid gray",
                            borderRadius: "50px",
                            padding: "20px",
                        }}
                    >
                        <BarChart
                            dataset={stateMetrics}
                            series={series}
                            chartSetting={chartSetting}
                            layout="horizontal"
                            width="100%"
                        />
                    </Box>
                )}

                {/* Rick Level and order information */}
                <Grid2
                    container
                    spacing={4}
                    sx={{
                        width: "100%",
                        marginTop: "30px",
                    }}
                >
                    <Grid2 size={6}>
                        <Card
                            sx={{
                                padding: "50px",
                            }}
                        >
                            <CardContent>
                                <List>
                                    {stateRiskLevel &&
                                        stateRiskLevel.length > 0 &&
                                        stateRiskLevel.map(
                                            (item: any, index: number) => (
                                                <ListItem
                                                    key={index}
                                                    secondaryAction={
                                                        <Chip
                                                            label={item.value}
                                                            sx={{
                                                                backgroundColor:
                                                                    "#90EE90",
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={item.label}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid2>
                    <Grid2 size={6}>
                        <Card sx={{ padding: "50px" }}>
                            <CardContent>
                                <List>
                                    {stateIcuBeds &&
                                        stateIcuBeds.length > 0 &&
                                        stateIcuBeds.map(
                                            (item: any, index: number) => (
                                                <ListItem
                                                    key={index}
                                                    secondaryAction={
                                                        <Chip
                                                            label={item.value}
                                                            sx={{
                                                                backgroundColor:
                                                                    "#90EE90",
                                                            }}
                                                        />
                                                    }
                                                >
                                                    <ListItemText
                                                        primary={item.label}
                                                    />
                                                </ListItem>
                                            )
                                        )}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>

                {stateVaccinationDoses && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            marginTop: "50px",
                            border: "1px solid gray",
                            borderRadius: "50px",
                            padding: "20px",
                        }}
                    >
                        <Typography variant="caption" gutterBottom>
                            Breakdown of Vaccination Data: Distributed,
                            Initiated, Completed, and Booster Doses.
                        </Typography>
                        <Box
                            sx={{
                                marginTop: "10px",
                            }}
                        >
                            <MuiPieChart
                                series={pieSeries}
                                width={900}
                                height={400}
                                padding={{ left: 100 }}
                                legendPositionV="middle"
                                legendPositionH="right"
                                fontSize={10}
                                legendDirection="column"
                            />
                        </Box>
                    </Box>
                )}
            </MuiDrawer>
        )
    );
};

export default StatePopulationDetails;
