import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import TextInput from "../../../components/TextInput";
import { Sketch } from "@uiw/react-color";
import { trimInputsValue } from "../../../home/utils/trimInputValue";
import Snackbar from "../../../components/Snackbar";
import Loading from "../../../components/Loading";
import { ThemeContext } from "../../../../context/ThemeContext";
import { createEmployeeQuery } from "../../utils/createEmployeeQuery";
import Tooltip from "../../../components/Tooltip";
import {
    EmployeeDetail,
    EmployeeFormProps,
    EmployeeInput,
    FieldDirty,
    FormMode,
} from "../../../../types";

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    selectedEmployee,
    handleCloseDrawer,
    refetchEmployees,
    isSuccess,
    setMessage,
    errorMessage,
    setErrorMessage,
    formMode,
    setFormMode,
}) => {
    const { winSize } = useContext(ThemeContext);
    const [employee, setEmployee] = useState<EmployeeDetail>(selectedEmployee);
    const firstNameRef = useRef<HTMLInputElement | null>(null);
    const lastNameRef = useRef<HTMLInputElement | null>(null);
    const emailRef = useRef<HTMLInputElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [color, setColor] = useState<string>("#c2c2c2");

    const clearInput = (
        ref: React.RefObject<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        if (ref.current) {
            ref.current.value = "";
        }
    };

    useEffect(() => {
        if (isSuccess) {
            handleCloseDrawer();
        }
    }, [isSuccess]);

    const [isFieldDirty, setIsFieldDirty] = useState<FieldDirty>({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
    });

    const originalValuesRef = useRef({
        firstName: selectedEmployee?.firstName || "",
        lastName: selectedEmployee?.lastName || "",
        email: selectedEmployee?.email || "",
        phone: selectedEmployee?.phone || "",
        color: selectedEmployee?.color || "#c2c2c2",
    });
    const originalValues = originalValuesRef.current;

    const handleColorChange = (newColor: any) => {
        const value = newColor.hex;

        // Set color state (for create mode, if you have that logic separate)
        setColor(value);

        // Update employee state
        setEmployee((prevEmployee) => ({
            ...prevEmployee,
            color: value,
        }));

        // Update isFieldDirty for color
        setIsFieldDirty((prevDirty) => ({
            ...prevDirty,
            color: value !== originalValues.color,
        }));
    };

    // This function except input field name in the form
    // The function returns an event handler for the given field
    // Compares the new input value with the original value to mark the field as "dirty" or not.
    // Updates the employee state with the new value, ensuring what you see on the form and what’s stored in state stay in sync.
    const handleFieldChange = useCallback(
        (fieldName: keyof FieldDirty) =>
            (
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                const newValue = event.target.value;

                setIsFieldDirty((prevDirty) => ({
                    ...prevDirty,
                    [fieldName]: newValue !== originalValues[fieldName],
                }));

                // Update employee state with the new value
                setEmployee((prevEmployee) => ({
                    ...prevEmployee,
                    [fieldName]: newValue,
                }));
            },
        [originalValues]
    );

    const handleEditForm = () => {
        setFormMode(FormMode.EDIT);
    };

    const handleCancelEditForm = () => {
        setFormMode(FormMode.READONLY);
        Object.entries(isFieldDirty).forEach(([fieldName, dirty]) => {
            if (dirty) {
                setEmployee((prevEmployee) => ({
                    ...prevEmployee,
                    [fieldName]: originalValues[fieldName as keyof FieldDirty],
                }));
            }
        });
    };

    const hasChanges = Object.values(isFieldDirty).some((dirty) => dirty);

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

            const processedPayload = trimInputsValue(payload) as EmployeeInput;

            // If in create mode perform create new record action
            if (formMode === FormMode.CREATE) {
                await createEmployeeQuery({
                    data: processedPayload,
                    setErrorMessage,
                    setMessage,
                    setLoading,
                    refetchEmployees,
                });
            } else if (
                // else in edit mode perform edit record action
                formMode === FormMode.EDIT &&
                selectedEmployee &&
                hasChanges
            ) {
                // Handle edit logic here
                console.log("Editing employee:", processedPayload);
            }
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

    if (loading) return <Loading />;

    const lgScreen = winSize && winSize >= 768;

    return (
        <div>
            <div className="flex items-center mb-5 gap-3">
                <h1 className="text-xl font-semibold">
                    {selectedEmployee
                        ? selectedEmployee.fullName
                        : "Create new employee"}
                </h1>

                {formMode !== FormMode.CREATE && (
                    <div>
                        {selectedEmployee && formMode !== FormMode.EDIT ? (
                            <Tooltip
                                content="Edit User Information"
                                position="bottom"
                            >
                                <button
                                    type="button"
                                    onClick={handleEditForm}
                                    className="shadow-md shadow-gray-500 rounded-lg py-1 px-3"
                                >
                                    Edit
                                </button>
                            </Tooltip>
                        ) : (
                            <Tooltip
                                content="Cancel all changes"
                                position="bottom"
                            >
                                <button
                                    type="button"
                                    onClick={handleCancelEditForm}
                                    className="shadow-md shadow-gray-500 rounded-lg py-1 px-3"
                                >
                                    Cancel Edit
                                </button>
                            </Tooltip>
                        )}
                    </div>
                )}
            </div>
            <form
                id="employee-form"
                aria-hidden="false"
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
                                value={
                                    formMode === FormMode.READONLY ||
                                    formMode === FormMode.EDIT
                                        ? employee.firstName
                                        : ""
                                }
                                ref={firstNameRef}
                                disabled={formMode === FormMode.READONLY}
                                onChange={handleFieldChange("firstName")}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                label="Last Name"
                                name="lastName"
                                type="text"
                                value={
                                    formMode === FormMode.READONLY ||
                                    formMode === FormMode.EDIT
                                        ? employee.lastName
                                        : ""
                                }
                                ref={lastNameRef}
                                disabled={formMode === FormMode.READONLY}
                                onChange={handleFieldChange("lastName")}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                label="Email"
                                name="email"
                                type="email"
                                value={
                                    formMode === FormMode.READONLY ||
                                    formMode === FormMode.EDIT
                                        ? employee.email
                                        : ""
                                }
                                ref={emailRef}
                                disabled={formMode === FormMode.READONLY}
                                onChange={handleFieldChange("email")}
                            />
                        </div>
                        <div className="mb-4">
                            <TextInput
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={
                                    formMode === FormMode.READONLY ||
                                    formMode === FormMode.EDIT
                                        ? employee.phone
                                        : ""
                                }
                                ref={phoneRef}
                                disabled={formMode === FormMode.READONLY}
                                onChange={handleFieldChange("phone")}
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
                                    disabled={formMode === FormMode.READONLY}
                                >
                                    <div
                                        className={`relative flex items-center justify-center h-full z-1 ${formMode === FormMode.READONLY ? "bg-gray-200" : "bg-white hover:bg-white-gradient-conic hover:font-bold"} rounded-[8px] p-2 transform duration-500`}
                                    >
                                        {formMode !== FormMode.EDIT &&
                                        formMode !== FormMode.READONLY
                                            ? "Create new employee"
                                            : "Confirm Edit"}
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <Sketch
                            color={
                                formMode === FormMode.READONLY ||
                                formMode === FormMode.EDIT
                                    ? employee.color
                                    : color
                            }
                            onChange={handleColorChange}
                            width={300}
                            aria-disabled={formMode === FormMode.READONLY}
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
                                disabled={formMode === FormMode.READONLY}
                            >
                                <div
                                    className={`relative flex items-center justify-center h-full z-1 ${formMode === FormMode.READONLY ? "bg-gray-200" : "bg-white hover:bg-white-gradient-conic hover:font-bold"} rounded-[8px] p-2 transform duration-500`}
                                >
                                    {formMode !== FormMode.EDIT &&
                                    formMode !== FormMode.READONLY
                                        ? "Create new employee"
                                        : "Confirm Edit"}
                                </div>
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
