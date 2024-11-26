import React, { memo } from "react";
import { CountyMetricsProps } from "../../../../types";
import CardHeader from "../../../components/CardHeader";
import PeopleIcon from "../../../../svgIcons/PeopleIcon";
import DeadFaceIcon from "../../../../svgIcons/DeadFaceIcon";
import HospitalBedIcon from "../../../../svgIcons/HospitalBedIcon";
import { StyledDiv } from "./styles";

const CountyActuals: React.FC<CountyMetricsProps> = ({ data }) => {
    return (
        <div>
            <CardHeader className="bg-white-gradient-conic rounded-t-xl">
                Actuals
            </CardHeader>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10">
                <div>
                    <StyledDiv>
                        <p>Total</p>
                        <p>{data.actuals.cases}</p>
                    </StyledDiv>
                    <StyledDiv>
                        <p>New</p>
                        <p>{data.actuals.newCases}</p>
                    </StyledDiv>
                    <CardHeader className="flex border-none bg-gradient-to-tr from-blue-500 to-green-500 text-white !text-sm items-center">
                        <PeopleIcon className="mr-3 w-7 h-7 text-white" />
                        Cases
                    </CardHeader>
                </div>

                <div>
                    <StyledDiv>
                        <p>Total</p>
                        <p>{data.actuals.deaths}</p>
                    </StyledDiv>
                    <StyledDiv>
                        <p>New</p>
                        <p>{data.actuals.newDeaths}</p>
                    </StyledDiv>
                    <CardHeader className="flex border-none bg-gradient-to-tr from-blue-500 to-green-500 text-white !text-sm items-center">
                        <DeadFaceIcon className="mr-3 w-7 h-7 text-white" />
                        Deaths
                    </CardHeader>
                </div>

                <div>
                    <StyledDiv>
                        <p>Total</p>
                        <p>{data.actuals.hospitalBeds.capacity}</p>
                    </StyledDiv>
                    <StyledDiv>
                        <p>Current</p>
                        <p>{data.actuals.hospitalBeds.currentUsageTotal}</p>
                    </StyledDiv>
                    <StyledDiv>
                        <p>COVID</p>
                        <p>{data.actuals.hospitalBeds.currentUsageCovid}</p>
                    </StyledDiv>
                    <CardHeader className="flex border-none bg-gradient-to-tr from-blue-500 to-green-500 text-white !text-sm items-center">
                        <HospitalBedIcon className="mr-3 w-7 h-7 text-white" />
                        Hospital Bed Usage
                    </CardHeader>
                </div>

                <div>
                    <StyledDiv>
                        <p>Total</p>
                        <p>{data.actuals.icuBeds.capacity}</p>
                    </StyledDiv>
                    <StyledDiv>
                        <p>Current</p>
                        <p>{data.actuals.icuBeds.currentUsageTotal}</p>
                    </StyledDiv>
                    <StyledDiv>
                        <p>COVID</p>
                        <p>{data.actuals.icuBeds.currentUsageCovid}</p>
                    </StyledDiv>
                    <CardHeader className="flex border-none bg-gradient-to-tr from-blue-500 to-green-500 text-white !text-sm items-center">
                        <HospitalBedIcon className="mr-3 w-7 h-7 text-white" />
                        ICU Bed Usage
                    </CardHeader>
                </div>
            </div>
        </div>
    );
};

export default memo(CountyActuals);
