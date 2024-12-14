import React, { memo, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Tooltip from "../../../components/Tooltip";
import AddIcon from "../../../../svgIcons/AddIcon";
import { getServices } from "../../utils/queryServices";

type ServiceType = {
    id: number;
    category: string;
    name: string;
    price: number;
};

const Services = () => {
    const { theme } = useContext(ThemeContext);

    const [services, setServices] = useState<ServiceType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getServices({ setServices, setLoading, ignoreCache: false });
    }, []);

    console.log(services);

    return (
        <div>
            <div className="flex justify-between mb-5">
                <h4
                    className={`text-lg ${theme === "dark" ? "text-white" : "text-emerald-900"} font-semibold`}
                >
                    Services
                </h4>
                <Tooltip content="Add new service" position="left">
                    <button
                        type="button"
                        // onClick={handleOpenUserDrawer}
                        className="shadow-md shadow-gray-500 rounded-lg"
                    >
                        <AddIcon className="w-7 h-7" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
};

export default memo(Services);
