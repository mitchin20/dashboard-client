import React, { useContext, useEffect, useRef, useState } from "react";
import TextInput from "../../../components/TextInput";
import { Sketch } from "@uiw/react-color";
import { trimInputsValue } from "../../../home/utils/trimInputValue";
import Snackbar from "../../../components/Snackbar";
import Loading from "../../../components/Loading";
import { ThemeContext } from "../../../../context/ThemeContext";
import { createEmployeeQuery } from "../../utils/createEmployeeQuery";

type Employee = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    color: string;
};

interface EmployeeFormProps {
    selectedEmployee?: any | null;
    handleCloseDrawer: () => void;
    refetchEmployees: () => void;
    isSuccess: boolean;
    setMessage: (message: string) => void;
    errorMessage: string | null;
    setErrorMessage: (message: string) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    selectedEmployee,
    handleCloseDrawer,
    refetchEmployees,
    isSuccess,
    setMessage,
    errorMessage,
    setErrorMessage,
}) => {
    const { winSize } = useContext(ThemeContext);
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#c2c2c2");

    const handleColorChange = (color: any) => {
        setColor(color.hex);
    };

    const clearInput = (
        ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (ref.current) {
            ref.current.value = "";
        }
    };

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        // Handle form submission here
        try {
            setLoading(true);
            const formData = new FormData(event.target as HTMLFormElement);
            const payload = Object.fromEntries(formData);
            payload.color = color;

            const processedPayload = trimInputsValue(payload) as Employee;

            const res = await createEmployeeQuery({
                data: processedPayload,
                setErrorMessage,
                setMessage,
                setLoading,
                refetchEmployees,
            });

            console.log("res", res);
        } catch (error) {
            console.error("Error processing form data:", error);
            setErrorMessage("Error processing form data");
        } finally {
            // Reset form fields
            clearInput(firstNameRef);
            clearInput(lastNameRef);
            clearInput(emailRef);
            clearInput(phoneRef);
            // Reset color to default color
            setColor("#c2c2c2");
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleCloseDrawer();
        }
    }, [isSuccess]);

    if (loading) return <Loading />;

    const lgScreen = winSize && winSize >= 768;

    return (
        <form
            id="employee-form"
            aria-hidden="true"
            onSubmit={handleFormSubmit}
            className="transform duration-500"
        >
            {errorMessage && (
                <Snackbar
                    message={errorMessage}
                    open={!!errorMessage}
                    severity="error"
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 xxs:grid-cols-1 gap-3">
                <div className="flex flex-col justify-center">
                    <div className="mb-4">
                        <TextInput
                            label="First Name"
                            name="firstName"
                            type="text"
                            ref={firstNameRef}
                        />
                    </div>
                    <div className="mb-4">
                        <TextInput
                            label="Last Name"
                            name="lastName"
                            type="text"
                            ref={lastNameRef}
                        />
                    </div>
                    <div className="mb-4">
                        <TextInput
                            label="Email"
                            name="email"
                            type="email"
                            ref={emailRef}
                        />
                    </div>
                    <div className="mb-4">
                        <TextInput
                            label="Phone"
                            name="phone"
                            type="tel"
                            ref={phoneRef}
                        />
                    </div>

                    {lgScreen && (
                        <div className="grid grid-cols-9 gap-3 mt-10 animate-slideIn">
                            <button
                                type="button"
                                onClick={handleCloseDrawer}
                                className="col-span-3 relative shadow-xl h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-500%] before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px]"
                            >
                                <div
                                    className={`relative flex items-center justify-center h-full z-1 bg-white hover:bg-white-gradient-conic hover:font-bold rounded-[8px] p-2`}
                                >
                                    Cancel
                                </div>
                            </button>
                            <button
                                type="submit"
                                className="col-span-6 relative shadow-xl h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-500%] before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px]"
                            >
                                <div
                                    className={`relative flex items-center justify-center h-full z-1 bg-white hover:bg-white-gradient-conic hover:font-bold rounded-[8px] p-2 transform duration-500`}
                                >
                                    Create new employee
                                </div>
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex justify-center">
                    <Sketch
                        color={color}
                        onChange={handleColorChange}
                        width={300}
                    />
                </div>

                {!lgScreen && (
                    <div className="grid grid-cols-9 gap-3 mt-10 animate-slideIn">
                        <button
                            type="button"
                            onClick={handleCloseDrawer}
                            className="col-span-3 relative shadow-xl h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-500%] before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px]"
                        >
                            <div
                                className={`relative flex items-center justify-center h-full z-1 bg-white hover:bg-white-gradient-conic hover:font-bold rounded-[8px] p-2 transform duration-500`}
                            >
                                Cancel
                            </div>
                        </button>
                        <button
                            type="submit"
                            className="col-span-6 relative shadow-xl h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-500%] before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px]"
                        >
                            <div
                                className={`relative flex items-center justify-center h-full z-1 bg-white hover:bg-white-gradient-conic hover:font-bold rounded-[8px] p-2 transform duration-500`}
                            >
                                Create new employee
                            </div>
                        </button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default EmployeeForm;
