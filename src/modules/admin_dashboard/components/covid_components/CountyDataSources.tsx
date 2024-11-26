import React, { memo } from "react";
import { CountyMetricsProps } from "../../../../types";
import Link from "../../../components/Link";
import ApacheIcon from "../../../../svgIcons/ApacheIcon";

const CountyDataSources: React.FC<CountyMetricsProps> = ({ data, loading }) => {
    if (loading) {
        return <div>Loading...</div>;
    }

    const casesAndDeathsSource = data?.annotations?.cases?.sources[0];
    const hospitalizationsSource = data?.annotations?.hospitalBeds?.sources[0];
    const vaccinationSource =
        data?.annotations?.vaccinationsAdditionalDose?.sources[0];

    return (
        <div className="mt-10">
            <div className="flex font-bold mb-3">
                <ApacheIcon className="w-6 h-6 mr-3" />
                <h1>Data Sources</h1>
            </div>

            <div className="flex flex-col ml-3 italic mb-10 text-xs gap-y-2">
                <h4>Cases and Deaths</h4>
                <Link href={casesAndDeathsSource.url[1]} target="_blank">
                    {casesAndDeathsSource.name}
                </Link>

                <h4>Hospitalizations</h4>
                <Link href={hospitalizationsSource.url} target="_blank">
                    {hospitalizationsSource.name}
                </Link>

                <h4>Vaccination Data</h4>
                <Link href={vaccinationSource.url} target="_blank">
                    {vaccinationSource.name}
                </Link>
            </div>
        </div>
    );
};

export default memo(CountyDataSources);
