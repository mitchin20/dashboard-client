import React, {
    lazy,
    memo,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import {
    CategoryFieldDirty,
    CategoryFormProps,
    CategoryType,
    FormMode,
} from "../../../../types";
import { ThemeContext } from "../../../../context/ThemeContext";
import { createCategoryQuery } from "../../utils/createCategoryQuery";
import { trimInputsValue } from "../../../home/utils/trimInputValue";
import { updateCategoryQuery } from "../../utils/updateCategoryQuery";
import Snackbar from "../../../components/Snackbar";
import TextInput from "../../../components/TextInput";
import Loading from "../../../components/Loading";

const CategoryForm: React.FC<CategoryFormProps> = ({
    selectedCategory,
    formMode,
    setFormMode,
    handleCloseDrawer,
    refetchCategories,
    isSuccess,
    setMessage,
    errorMessage,
    setErrorMessage,
}) => {
    const { theme, winSize } = useContext(ThemeContext);
    const [category, setCategory] = useState<CategoryType>(selectedCategory);
    const [loading, setLoading] = useState<boolean>(false);

    const nameRef = useRef<HTMLInputElement | null>(null);

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

    const [isFieldDirty, setIsFieldDirty] = useState<CategoryFieldDirty>({
        name: false,
    });

    const originalValuesRef = useRef({
        name: selectedCategory?.name || "",
    });

    const originalValues = originalValuesRef.current;

    const handleFieldChange = useCallback(
        (fieldName: keyof CategoryFieldDirty) =>
            (
                event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
            ) => {
                const newValue = event.target.value;

                setIsFieldDirty((prevDirty) => ({
                    ...prevDirty,
                    [fieldName]: newValue !== originalValues[fieldName],
                }));

                setCategory((prevCategory) => ({
                    ...prevCategory,
                    [fieldName]: newValue,
                }));
            },
        [originalValues]
    );

    const hasFieldChange = Object.values(isFieldDirty).some((dirty) => dirty);

    const handleEditForm = () => {
        setFormMode(FormMode.EDIT);
    };

    const handleCancelEditForm = () => {
        setFormMode(FormMode.READONLY);
        Object.entries(isFieldDirty).forEach(([fieldName, dirty]) => {
            if (dirty) {
                setCategory((prevService) => ({
                    ...prevService,
                    [fieldName]:
                        originalValues[fieldName as keyof CategoryFieldDirty],
                }));
            }
        });
    };

    const handleFormSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setLoading(true);

            const formData = new FormData(event.target as HTMLFormElement);
            const payload = Object.fromEntries(formData);

            const processedPayload = trimInputsValue(payload) as CategoryType;

            if (formMode === FormMode.CREATE) {
                await createCategoryQuery({
                    data: processedPayload,
                    setErrorMessage,
                    setMessage,
                    setLoading,
                    refetchCategories,
                });
            } else if (
                formMode === FormMode.EDIT &&
                selectedCategory &&
                hasFieldChange
            ) {
                await updateCategoryQuery({
                    categoryId: selectedCategory.id,
                    data: processedPayload,
                    setErrorMessage,
                    setMessage,
                    setLoading,
                    refetchCategories,
                });
            }
        } catch (error) {
            console.error("Error processing form data:", error);
            setErrorMessage("Error processing form data");
        } finally {
            // Reset form fields
            clearInput(nameRef);
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <div className="flex items-center mb-5 gap-3">
                <h1 className="text-xl font-semibold">
                    {selectedCategory
                        ? selectedCategory.name
                        : "Create new service"}
                </h1>

                {formMode !== FormMode.CREATE && (
                    <div>
                        {selectedCategory && formMode !== FormMode.EDIT ? (
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
                id="category-form"
                aria-hidden="false"
                onSubmit={handleFormSubmit}
                className="transform duration-500 mb-10"
            >
                {errorMessage && (
                    <Snackbar
                        message={errorMessage}
                        open={!!errorMessage}
                        severity="error"
                    />
                )}

                <TextInput
                    label="Category name"
                    name="name"
                    ref={nameRef}
                    value={
                        formMode === FormMode.READONLY ||
                        formMode === FormMode.EDIT
                            ? category.name
                            : ""
                    }
                    disabled={formMode === FormMode.READONLY}
                    onChange={handleFieldChange("name")}
                />

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
                            ? "Create new category tag"
                            : "Confirm Edit"}
                    </div>
                </button>
            </form>
        </div>
    );
};

export default memo(CategoryForm);
