import React, { lazy, useContext, useEffect, useState } from "react";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import Snackbar from "../../components/Snackbar";
import { trimInputsValue } from "../../home/utils/trimInputValue";
import { setRecentPageVisited } from "../../../helpers/recentPageVisited";
import { getCountyMetricData } from "../utils/queryCountyMetricData";
import { ThemeContext } from "../../../context/ThemeContext";
import InfoIcon from "../../../svgIcons/InfoIcon";
import Tooltip from "../../components/Tooltip";
import Loading from "../../components/Loading";

const CountyGeneralInfo = lazy(
    () => import("../components/covid_components/CountyGeneralInfo")
);
const CountyCurrentMetrics = lazy(
    () => import("../components/covid_components/CountyCurrentMetrics")
);
const CountyActuals = lazy(
    () => import("../components/covid_components/CountyActuals")
);
const CountyAnnotations = lazy(
    () => import("../components/covid_components/CountyAnnotations")
);
const CountyVaccDemographics = lazy(
    () => import("../components/covid_components/CountyVaccDemographics")
);
const CountyCommunityRiskLevels = lazy(
    () => import("../components/covid_components/CountyCommunityRiskLevels")
);
const CountyDataSources = lazy(
    () => import("../components/covid_components/CountyDataSources")
);
const CountyGeoGraph = lazy(
    () => import("../components/covid_components/CountyGeoGraph")
);

const CountyCovidData = () => {
    const { theme, winSize } = useContext(ThemeContext);
    // 42101 Philadelphia fips code
    const [fips, setFips] = useState<string>("");
    const [message, setMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [countyData, setCountyData] = useState<object>({});
    const [countyLoading, setCountyLoading] = useState<boolean>(false);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target as HTMLFormElement);

            // Returns an object created by key-value entries for properties and methods
            const payload = Object.fromEntries(formData);
            // Process each field in payload
            const processedPayload = trimInputsValue(payload);

            if (!processedPayload.fipsCode) {
                setErrorMessage("Please enter county fips code.");
                return;
            }
            setFips(processedPayload.fipsCode);
        } catch (error) {
            console.error(error);
            setErrorMessage("Please enter county fips code.");
        }
    };

    useEffect(() => {
        if (fips) {
            getCountyMetricData({
                countyFips: fips,
                setCountyData,
                setErrorMessage,
                setMessage,
                setCountyLoading,
            });
        }
    }, [fips]);

    useEffect(() => {
        const currentPath = window.location.pathname;
        setRecentPageVisited("recentPageVisited", {
            name: "County-Covid19",
            url: currentPath,
        });
    }, []);

    if (countyLoading) return <Loading />;

    const smallScreen = winSize && winSize <= 768;
    return (
        <div
            className={`${theme === "dark" ? "text-white" : "text-black"} transform duration-700`}
        >
            {errorMessage && (
                <Snackbar
                    message={errorMessage}
                    open={!!errorMessage}
                    onClose={() => setErrorMessage(null)}
                    className="text-red-500 z-10"
                />
            )}
            {message && (
                <Snackbar
                    message={message}
                    open={!!message}
                    onClose={() => setMessage(null)}
                    className="text-green-500 z-10"
                />
            )}
            <form onSubmit={handleSearch}>
                <div className="flex gap-x-2 justify-center items-center my-5">
                    <Tooltip
                        position={`${smallScreen ? "right" : "bottom"}`}
                        content="FIPS codes uniquely identify counties. Use a Census lookup tool or public datasets to find your county's code by name and state."
                        className="text-pretty w-[250px]"
                    >
                        <InfoIcon className="w-6 h-6" />
                    </Tooltip>
                    <TextInput
                        type="text"
                        label="County Fips Code"
                        placeholder="ex: 42101"
                        name="fipsCode"
                        className="text-black"
                    />

                    <Button
                        text="Search"
                        type="submit"
                        className="py-2 rounded-full"
                    />
                </div>
            </form>

            {countyData && Object.entries(countyData).length > 0 ? (
                <div className="grid grid-cols-12 mt-10 gap-5">
                    <div className="col-span-12">
                        <CountyGeneralInfo data={countyData} />
                    </div>

                    <div
                        className={`col-span-12 md:col-span-6 h-[300px] md:h-[500px]`}
                    >
                        <CountyGeoGraph
                            fips={fips}
                            height={smallScreen ? "300px" : "100%"}
                        />
                    </div>
                    <div className={`col-span-12 md:col-span-6`}>
                        <CountyActuals data={countyData} />
                    </div>

                    <div className={`col-span-12 md:col-span-6`}>
                        <CountyCurrentMetrics data={countyData} />
                    </div>

                    <div className={`col-span-12 md:col-span-6`}>
                        <CountyCommunityRiskLevels data={countyData} />
                        <CountyAnnotations data={countyData} />
                    </div>

                    <div className="col-span-12">
                        <CountyVaccDemographics data={countyData} />
                    </div>

                    <div className="col-span-12">
                        <CountyDataSources data={countyData} />
                    </div>
                </div>
            ) : (
                <div className="flex flex-col justify-center items-center mt-20 gap-y-5">
                    <p className="">Please enter a valid county fips code.</p>
                    <p>
                        The Federal Information Processing Standard (FIPS) code
                        is a unique identifier used to represent geographic
                        areas like counties. To find the correct FIPS code for
                        your county, you can use tools like the{" "}
                        <a
                            href="https://www.census.gov/library/reference/code-lists/ansi.html"
                            target="_blank"
                            className="text-blue-500 underline"
                        >
                            Census Bureau's online FIPS
                        </a>{" "}
                        lookup tool or refer to publicly available datasets that
                        list county codes by state. Simply enter the name of
                        your county and state to retrieve the corresponding FIPS
                        code.
                    </p>
                </div>
            )}
        </div>
    );
};

export default CountyCovidData;
