import React, { useContext, useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { EmployeeType, ServiceDetail } from "../../../types";
import { getEmployees } from "../utils/queryEmployees";
import Loading from "../../components/Loading";
import { getServices } from "../utils/queryServices";
import { groupServiceByCategory } from "../../../helpers/groupServicesByCategory";
import { ThemeContext } from "../../../context/ThemeContext";
import { trimInputsValue } from "../../home/utils/trimInputValue";
import { Dayjs } from "dayjs";
import { TextField } from "@mui/material";

const Booking = () => {
    const { theme } = useContext(ThemeContext);

    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [services, setServices] = useState<ServiceDetail[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        getEmployees({ setEmployees, setLoading, ignoreCache: true });
        getServices({ setServices, setLoading, ignoreCache: true });
    }, []);

    const handleEmployeeSelect = (id: number) => {
        console.log("Employee Id: ", id);
    };

    const groupProcessedPayload = (
        processedPayload: Record<string, string>
    ) => {
        const employees: Record<string, string> = {};
        const services: Record<string, string> = {};

        // Separate employees and services
        for (const [key, value] of Object.entries(processedPayload)) {
            if (key.startsWith("employee")) {
                employees[key] = value;
            } else if (key.startsWith("service")) {
                services[key] = value;
            }
        }

        // Combine into an array of objects
        const grouped = Object.entries(employees).map(
            ([employeeKey, employeeValue], index) => {
                // Match service by index
                const serviceKey = Object.keys(services)[index];
                const serviceValue = services[serviceKey];

                return {
                    [employeeKey]: employeeValue,
                    [serviceKey]: serviceValue,
                };
            }
        );

        return grouped;
    };

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);

            const formData = new FormData(event.target as HTMLFormElement);
            const payload = Object.fromEntries(formData);

            const processedPayload = trimInputsValue(payload);

            const groupedPayload = groupProcessedPayload(processedPayload);

            console.log(groupedPayload);
            const date = new Date(processedPayload?.date);
            console.log(date.toLocaleDateString());
        } catch (error) {
            console.error("Error processing form data:", error);
            setErrorMessage(
                "An error occurred while processing the form data."
            );
        } finally {
            setLoading(false);
        }
    };

    const groupServicesByCategory = groupServiceByCategory(services);

    if (loading) return <Loading />;

    return (
        <div className="mt-10">
            <h1 className="text-xl font-semibold mb-10">
                Bookme (In Development)
            </h1>

            <form onSubmit={handleFormSubmit}>
                <div>
                    <div>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                    label="Date picker"
                                    value={selectedDate}
                                    onChange={(value) => setSelectedDate(value)}
                                    slots={{
                                        textField: TextField, // Custom input component
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true, // Optional props for the TextField
                                        },
                                    }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                        <input
                            type="hidden"
                            name="date"
                            value={
                                selectedDate ? selectedDate.toISOString() : ""
                            }
                        />
                    </div>

                    <FormGroup>
                        <h4
                            className={`text-sm font-semibold mt-5 ${theme === "dark" ? "text-white" : "text-black"}`}
                        >
                            Service selection
                        </h4>
                        <div className="grid grid-cols-12 ml-2">
                            {groupServicesByCategory &&
                                Object.entries(groupServicesByCategory).map(
                                    (services, index) => (
                                        <div
                                            key={index}
                                            className="col-span-4 mt-5"
                                        >
                                            <FormControl>
                                                <h4
                                                    className={`text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
                                                >
                                                    Available Technicians
                                                </h4>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                >
                                                    {employees &&
                                                        employees.map(
                                                            (
                                                                employee,
                                                                index
                                                            ) => (
                                                                <FormControlLabel
                                                                    key={index}
                                                                    name={`employee-${index}`}
                                                                    value={
                                                                        employee.fullName
                                                                    }
                                                                    control={
                                                                        <Radio
                                                                            onChange={() =>
                                                                                handleEmployeeSelect(
                                                                                    employee.id
                                                                                )
                                                                            }
                                                                            sx={{
                                                                                "& .MuiSvgIcon-root":
                                                                                    {
                                                                                        fontSize:
                                                                                            "12px",
                                                                                    },
                                                                            }}
                                                                        />
                                                                    }
                                                                    label={
                                                                        employee.fullName
                                                                    }
                                                                    sx={{
                                                                        "& .MuiFormControlLabel-label":
                                                                            {
                                                                                fontSize:
                                                                                    "12px",
                                                                            },
                                                                    }}
                                                                />
                                                            )
                                                        )}
                                                </RadioGroup>
                                            </FormControl>

                                            <h4
                                                className={`text-sm font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
                                            >
                                                {services[0]}
                                            </h4>

                                            {services[1].map(
                                                (service, index) => (
                                                    <FormControlLabel
                                                        key={index}
                                                        label={`${service.name} $${service.price}`}
                                                        control={
                                                            <Checkbox
                                                                name={`service-${service.id}`}
                                                                value={
                                                                    service.name
                                                                }
                                                                sx={{
                                                                    "& .MuiSvgIcon-root":
                                                                        {
                                                                            fontSize:
                                                                                "12px",
                                                                        },
                                                                }}
                                                            />
                                                        }
                                                        sx={{
                                                            "& .MuiFormControlLabel-label":
                                                                {
                                                                    fontSize:
                                                                        "12px",
                                                                },
                                                        }}
                                                    />
                                                )
                                            )}
                                        </div>
                                    )
                                )}
                        </div>
                    </FormGroup>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Booking;
