import React, { memo, useContext } from "react";
import { CountyMetricsProps } from "../../../../types";
import { getObjectFields } from "../../../../helpers/getObjectFields";
import Card2 from "../../../components/Card2";
import CardHeader from "../../../components/CardHeader";
import CardContent from "../../../components/CardContent";
import Link from "../../../components/Link";
import { ThemeContext } from "../../../../context/ThemeContext";

const CountyGeneralInfo: React.FC<CountyMetricsProps> = ({ data }) => {
    const { winSize } = useContext(ThemeContext);

    const generalFields = [
        "county",
        "country",
        "state",
        "fips",
        "hsa",
        "hsaName",
        "population",
        "hsaPopulation",
        "lat",
        "long",
        "lastUpdatedDate",
        "url",
    ];
    const generalInfo = getObjectFields(data, generalFields);
    const xsScreen = typeof winSize === "number" && winSize <= 375;
    const mdScreen =
        typeof winSize === "number" && winSize < 769 && winSize > 376;

    return (
        <div
            className={`grid gap-8 text-center mb-5 ${
                xsScreen
                    ? "grid-cols-2"
                    : mdScreen
                      ? "grid-cols-3"
                      : "grid-cols-5"
            } ${mdScreen ? "text-xs" : "text-sm"}`}
        >
            <Card2 className="shadow-md">
                <CardHeader className="text-xs">
                    {generalInfo?.county}
                </CardHeader>
                <CardContent>
                    {generalInfo?.fips} - {generalInfo?.state} -{" "}
                    {generalInfo?.country}
                </CardContent>
            </Card2>
            <Card2 className="shadow-md">
                <CardHeader className="text-xs">
                    {generalInfo?.hsa ? `HSA-${generalInfo?.hsa}` : "N/A"}
                </CardHeader>
                <CardContent>{generalInfo?.hsaName}</CardContent>
            </Card2>
            <Card2 className="shadow-md">
                <CardHeader className="text-xs">Population</CardHeader>
                <CardContent>
                    {generalInfo?.population} - {generalInfo?.hsaPopulation}
                </CardContent>
            </Card2>
            <Card2 className="shadow-md">
                <CardHeader className="text-xs">Last Updated</CardHeader>
                <CardContent>{generalInfo?.lastUpdatedDate}</CardContent>
            </Card2>
            <Card2 className="shadow-md">
                <CardHeader className="text-xs">Source</CardHeader>
                <CardContent>
                    <Link
                        href={generalInfo?.url}
                        target="_blank"
                        ariaLabel="Data Source"
                    >
                        {generalInfo?.county}
                    </Link>
                </CardContent>
            </Card2>
        </div>
    );
};

export default memo(CountyGeneralInfo);
