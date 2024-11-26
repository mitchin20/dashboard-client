import React, { memo } from "react";
import { CountyMetricsProps } from "../../../../types";
import DateDayIcon from "../../../../svgIcons/DateDayIcon";
import CardHeader from "../../../components/CardHeader";
import { StyledDiv } from "./styles";

const CountyAnnotations: React.FC<CountyMetricsProps> = ({ data }) => {
    const newCases = data?.annotations?.newCases?.anomalies;
    return (
        <div className="mt-10">
            <CardHeader className="flex border-none bg-gradient-to-tr from-blue-500 to-green-500 text-white !text-sm items-center">
                <DateDayIcon className="w-6 h-6 mr-3" />
                Anomalies
            </CardHeader>

            {newCases?.map((anomaly: any, index: number) => (
                <StyledDiv key={index}>
                    <span className="font-bold">
                        {anomaly.type} - {anomaly.date}
                    </span>
                    <span>{anomaly.original_observation}</span>
                </StyledDiv>
            ))}
        </div>
    );
};

export default memo(CountyAnnotations);
