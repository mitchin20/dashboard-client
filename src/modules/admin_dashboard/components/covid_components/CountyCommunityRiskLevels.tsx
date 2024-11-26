import React, { memo } from "react";
import { CountyMetricsProps } from "../../../../types";
import ChartLineUpIcon from "../../../../svgIcons/ChartLineUpIcon";
import ChartLineDownIcon from "../../../../svgIcons/ChartLineDownIcon";

const CountyCommunityRiskLevels: React.FC<CountyMetricsProps> = ({ data }) => {
    return (
        <div>
            <div className="pl-2 bg-white-gradient-conic xxs:text-sm font-bold mt-10">
                <div className="grid grid-cols-12 items-center">
                    <div className="flex col-span-10 text-[#4a90e2]">
                        <ChartLineUpIcon className="w-6 h-6 mr-2" />
                        CDC Transmission
                    </div>
                    <div className="col-span-2 text-center bg-red-400 p-2 hover:bg-red-300">
                        {data?.cdcTransmissionLevel || "N/A"}
                    </div>
                </div>
                <div className="grid grid-cols-12 items-center">
                    <div className="flex col-span-10 text-[#4a90e2]">
                        <ChartLineDownIcon className="w-6 h-6 mr-2" />
                        CDC Community
                    </div>
                    <div className="col-span-2 text-center bg-red-400 p-2 hover:bg-red-300">
                        {data?.communityLevels.cdcCommunityLevel || "0"}
                    </div>
                </div>
                <div className="grid grid-cols-12 items-center">
                    <div className="flex col-span-10 text-[#4a90e2]">
                        <ChartLineDownIcon className="w-6 h-6 mr-2" />
                        CAN Community
                    </div>
                    <div className="col-span-2 text-center bg-red-400 p-2 hover:bg-red-300">
                        {data?.communityLevels.canCommunityLevel || "0"}
                    </div>
                </div>
            </div>
            <h1 className="text-center text-sm mt-2 italic">
                Community Risk Levels
            </h1>
        </div>
    );
};

export default memo(CountyCommunityRiskLevels);
