import React, { lazy, memo, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Tooltip from "../../../components/Tooltip";
import AddIcon from "../../../../svgIcons/AddIcon";
import { getServices } from "../../utils/queryServices";
import { FormMode, ServiceDetail } from "../../../../types";
import MuiDrawer from "../../../components/MuiDrawer";
import DeleteIcon from "../../../../svgIcons/DeleteIcon";
import { deleteServiceQuery } from "../../utils/deleteServiceQuery";
import Loading from "../../../components/Loading";
import Snackbar from "../../../components/Snackbar";

const ServiceForm = lazy(() => import("./ServiceForm"));

interface Services {
    services: ServiceDetail[];
    setServices: (services: ServiceDetail[]) => void;
}

const Services: React.FC<Services> = ({ services, setServices }) => {
    const { theme, winSize } = useContext(ThemeContext);

    const [deletedService, setDeletedService] = useState<ServiceDetail | null>(
        null
    );
    const [message, setMessage] = useState<string | null>("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedService, setSelectedService] =
        useState<ServiceDetail | null>(null);
    const [openServiceDrawer, setOpenServiceDrawer] = useState<boolean>(false);
    const [formMode, setFormMode] = useState<FormMode>(FormMode.CREATE);

    const handleSelectedService = (service: ServiceDetail) => {
        setSelectedService(service);
    };

    const handleOpenServiceDrawer = () => {
        setOpenServiceDrawer(true);
        setMessage("");
        setErrorMessage("");
    };

    const handleCloseServiceDrawer = () => {
        setOpenServiceDrawer(false);
        setSelectedService(null);
        setFormMode(FormMode.CREATE);
    };

    useEffect(() => {
        getServices({ setServices, setLoading, ignoreCache: false });
    }, []);

    useEffect(() => {
        if (selectedService) {
            setFormMode(FormMode.READONLY);
            setOpenServiceDrawer(true);
        }
    }, [selectedService]);

    const refetchServices = async () => {
        await getServices({ setServices, setLoading, ignoreCache: true });
    };

    const handleDeleteService = async (serviceId: number) => {
        await deleteServiceQuery({
            serviceId,
            setErrorMessage,
            setMessage,
            setLoading,
            setDeletedService,
            refetchServices,
        });
    };

    const groupServiceByCategory = services.reduce(
        (acc, service) => {
            const { category } = service;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(service);
            return acc;
        },
        {} as { [key: string]: ServiceDetail[] }
    );

    if (loading) return <Loading />;

    const lgScreen = winSize && winSize >= 1024;

    return (
        <div>
            {message && (
                <Snackbar
                    message={message}
                    open={!!message}
                    severity="success"
                    onClose={() => setMessage("")}
                    autoHideDuration={3000}
                />
            )}

            {message && deletedService && (
                <Snackbar
                    message={`${deletedService.name} ${message}`}
                    open={!!message}
                    severity="success"
                    onClose={() => {
                        setMessage("");
                        setDeletedService(null);
                    }}
                    autoHideDuration={4000}
                />
            )}
            <div className="flex justify-between mb-5">
                <h4
                    className={`text-lg ${theme === "dark" ? "text-white" : "text-emerald-900"} font-semibold`}
                >
                    Services
                </h4>
                <Tooltip content="Add new service" position="left">
                    <button
                        type="button"
                        onClick={handleOpenServiceDrawer}
                        className="shadow-md shadow-gray-500 rounded-lg"
                    >
                        <AddIcon className="w-7 h-7" />
                    </button>
                </Tooltip>
            </div>

            <div className="grid grid-cols-12 ml-5 gap-10">
                {Object.entries(groupServiceByCategory).map(
                    (service, index) => (
                        <div key={index} className="col-span-4">
                            <h4
                                className={`font-semibold mb-3 ${theme === "dark" ? "text-white" : "text-black"}`}
                            >
                                {service[0]}
                            </h4>
                            {service[1].map((service, index) => (
                                <div
                                    key={index}
                                    className={`flex justify-between items-center ml-5 p-1 border rounded-lg mb-3 ${theme === "dark" ? "hover:bg-slate-400" : "hover:bg-slate-100"}`}
                                >
                                    <button
                                        onClick={() =>
                                            handleSelectedService(service)
                                        }
                                        className="text-sm border rounded-full py-1 px-4 bg-white"
                                    >
                                        {service.name}
                                    </button>
                                    <div className="flex gap-5 justify-center items-center">
                                        <div
                                            className={`text-sm ${theme === "dark" ? "text-white" : "text-dark"}`}
                                        >
                                            $ {service.price}
                                        </div>
                                        <Tooltip
                                            content="Delete service"
                                            position="left"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleDeleteService(
                                                        service.id
                                                    )
                                                }
                                                className="flex items-center justify-center p-2 border rounded-lg bg-white"
                                            >
                                                <DeleteIcon className="w-4 h-4" />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                )}
            </div>

            <MuiDrawer
                aria-hidden="false"
                anchor="right"
                open={openServiceDrawer}
                onClose={handleCloseServiceDrawer}
                PaperProps={{
                    sx: {
                        width: "90%",
                        padding: "20px",
                    },
                }}
            >
                <ServiceForm
                    selectedService={selectedService}
                    handleCloseDrawer={handleCloseServiceDrawer}
                    refetchServices={refetchServices}
                    isSuccess={!!message}
                    setMessage={setMessage}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    formMode={formMode}
                    setFormMode={setFormMode}
                />
            </MuiDrawer>
        </div>
    );
};

export default memo(Services);
