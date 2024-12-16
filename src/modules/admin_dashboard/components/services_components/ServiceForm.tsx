import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
    FormMode,
    ServiceDetail,
    ServiceFieldDirty,
    ServiceFormProps,
    ServiceInput,
} from "../../../../types";
import { trimInputsValue } from "../../../home/utils/trimInputValue";
import { createServiceQuery } from "../../utils/createServiceQuery";
import TextInput from "../../../components/TextInput";
import { updateServiceQuery } from "../../utils/updateServiceQuery";
import Snackbar from "../../../components/Snackbar";

const ServiceForm: React.FC<ServiceFormProps> = ({
    selectedService,
    handleCloseDrawer,
    refetchServices,
    isSuccess,
    setMessage,
    errorMessage,
    setErrorMessage,
    formMode,
    setFormMode,
}) => {
    const { theme, winSize } = useContext(ThemeContext);
    const [service, setService] = useState<ServiceDetail>(selectedService);
    const [loading, setLoading] = useState<boolean>(false);

    const categoryRef = useRef<HTMLInputElement | null>(null);
    const nameRef = useRef<HTMLInputElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);

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

    const [isFieldDirty, setIsFieldDirty] = useState<ServiceFieldDirty>({
        category: false,
        name: false,
        price: false,
    });

    const originalValuesRef = useRef({
        category: selectedService?.category || "",
        name: selectedService?.name || "",
        price: selectedService?.price || 0,
    });

    const originalValues = originalValuesRef.current;

    const handleFieldChange = useCallback(
        (fieldName: keyof ServiceFieldDirty) =>
            (
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                const newValue = event.target.value;

                setIsFieldDirty((prevDirty) => ({
                    ...prevDirty,
                    [fieldName]: newValue !== originalValues[fieldName],
                }));

                setService((prevService) => ({
                    ...prevService,
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
                setService((prevService) => ({
                    ...prevService,
                    [fieldName]:
                        originalValues[fieldName as keyof ServiceFieldDirty],
                }));
            }
        });
    };

    const hasChanges = Object.values(isFieldDirty).some((dirty) => dirty);

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData(event.target as HTMLFormElement);
            const payload = Object.fromEntries(formData);

            const processedPayload = trimInputsValue(payload) as ServiceInput;

            if (formMode === FormMode.CREATE) {
                await createServiceQuery({
                    data: processedPayload,
                    setErrorMessage,
                    setMessage,
                    setLoading,
                    refetchServices,
                });
            } else if (
                formMode === FormMode.EDIT &&
                selectedService &&
                hasChanges
            ) {
                await updateServiceQuery({
                    serviceId: selectedService.id,
                    data: processedPayload,
                    setErrorMessage,
                    setMessage,
                    setLoading,
                    refetchServices,
                });
            }
        } catch (error) {
            console.error("Error processing form data:", error);
            setErrorMessage("Error processing form data");
        } finally {
            // Reset form fields
            clearInput(categoryRef);
            clearInput(nameRef);
            clearInput(priceRef);
        }
    };

    return (
        <div>
            <div className="flex items-center mb-5 gap-3">
                <h1 className="text-xl font-semibold">
                    {selectedService
                        ? selectedService.name
                        : "Create new service"}
                </h1>

                {formMode !== FormMode.CREATE && (
                    <div>
                        {selectedService && formMode !== FormMode.EDIT ? (
                            <button
                                type="button"
                                onClick={handleEditForm}
                                className="shadow-md shadow-gray-500 rounded-lg py-1 px-3"
                            >
                                Edit
                            </button>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCancelEditForm}
                                className="shadow-md shadow-gray-500 rounded-lg py-1 px-3"
                            >
                                Cancel Edit
                            </button>
                        )}
                    </div>
                )}
            </div>

            <form
                id="service-form"
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
                <div className="flex flex-col gap-3">
                    <TextInput
                        label="Category"
                        name="category"
                        ref={categoryRef}
                        value={
                            formMode === FormMode.READONLY ||
                            formMode === FormMode.EDIT
                                ? service.category
                                : ""
                        }
                        disabled={formMode === FormMode.READONLY}
                        onChange={handleFieldChange("category")}
                    />
                    <TextInput
                        label="Service name"
                        name="name"
                        type="text"
                        ref={nameRef}
                        value={
                            formMode === FormMode.READONLY ||
                            formMode === FormMode.EDIT
                                ? service.name
                                : ""
                        }
                        disabled={formMode === FormMode.READONLY}
                        onChange={handleFieldChange("name")}
                    />
                    <TextInput
                        label="Service price"
                        type="number"
                        name="price"
                        ref={priceRef}
                        value={
                            formMode === FormMode.READONLY ||
                            formMode === FormMode.EDIT
                                ? service.price.toString()
                                : "0"
                        }
                        disabled={formMode === FormMode.READONLY}
                        onChange={handleFieldChange("price")}
                    />
                </div>
                <button
                    type="submit"
                    className="col-span-6 relative shadow-xl h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-500%] before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px] mt-10"
                    disabled={formMode === FormMode.READONLY}
                >
                    <div
                        className={`relative flex items-center justify-center h-full z-1 ${formMode === FormMode.READONLY ? "bg-gray-200" : "bg-white hover:bg-white-gradient-conic hover:font-bold"} rounded-[8px] p-2 transform duration-500`}
                    >
                        {formMode !== FormMode.EDIT &&
                        formMode !== FormMode.READONLY
                            ? "Create new service"
                            : "Confirm Edit"}
                    </div>
                </button>
            </form>
        </div>
    );
};

export default ServiceForm;
