import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import {
    CategoryType,
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
import { getCategories } from "../../utils/queryCategories";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

    const [categories, setCategories] = useState<CategoryType[]>([]);
    useState<CategoryType | null>(null);
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

    useEffect(() => {
        getCategories({ setCategories, setLoading, ignoreCache: true });
    }, [selectedService]);

    const [isFieldDirty, setIsFieldDirty] = useState<ServiceFieldDirty>({
        categoryId: false,
        name: false,
        price: false,
    });

    const originalValuesRef = useRef({
        categoryId: selectedService?.categoryId || 0,
        name: selectedService?.name || "",
        price: selectedService?.price || 0,
    });

    const originalValues = originalValuesRef.current;

    const handleTextFieldChange = useCallback(
        (fieldName: keyof ServiceFieldDirty) =>
            (
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                let newValue: string | number = event.target.value;

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

    // Handler that works with RadioGroup directly
    const handleCategoryChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
            const categoryId = Number(newValue);

            setIsFieldDirty((prevDirty) => ({
                ...prevDirty,
                categoryId: categoryId !== originalValues.categoryId,
            }));

            setService((prevService) => ({
                ...prevService,
                categoryId: categoryId,
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

            if (
                processedPayload.name === "" &&
                processedPayload.price.toString() === "0.00"
            ) {
                setErrorMessage("All fields are required.");
                return;
            }

            const categoryId = Number(processedPayload.category);

            const parsedCategory = categories?.find(
                (cate) => cate.id === categoryId
            );

            if (!parsedCategory) {
                setErrorMessage("Missing category tag.");
                return;
            }

            const transformedData = {
                category: parsedCategory?.name,
                name: processedPayload.name,
                price: processedPayload.price,
                categoryId: parsedCategory?.id,
            };

            if (formMode === FormMode.CREATE) {
                await createServiceQuery({
                    data: transformedData,
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
                    data: transformedData,
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
            {errorMessage && (
                <Snackbar
                    message={errorMessage}
                    open={!!errorMessage}
                    severity="error"
                    position="top"
                />
            )}
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
                <div className="flex flex-col gap-3">
                    <FormControl>
                        <FormLabel>Tags</FormLabel>

                        <RadioGroup
                            row
                            value={String(service?.categoryId)}
                            onChange={handleCategoryChange}
                        >
                            {categories.map((category, index) => (
                                <FormControlLabel
                                    key={index}
                                    value={String(category.id)}
                                    control={
                                        <Radio size="small" name="category" />
                                    }
                                    ref={categoryRef}
                                    label={category.name}
                                    className="text-sm"
                                    disabled={formMode === FormMode.READONLY}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
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
                        onChange={handleTextFieldChange("name")}
                    />
                    <div className="flex gap-1">
                        <p className="border-2 border-gray-400 rounded-lg p-2 shadow-lg">
                            $
                        </p>
                        <div className="w-full">
                            <TextInput
                                label="Service price"
                                type="money"
                                name="price"
                                ref={priceRef}
                                value={
                                    formMode === FormMode.READONLY ||
                                    formMode === FormMode.EDIT
                                        ? service.price.toString()
                                        : "0.00"
                                }
                                disabled={formMode === FormMode.READONLY}
                                onChange={handleTextFieldChange("price")}
                            />
                        </div>
                    </div>
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
