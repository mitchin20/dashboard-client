import React, { lazy, memo, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../../context/ThemeContext";
import Tooltip from "../../../components/Tooltip";
import AddIcon from "../../../../svgIcons/AddIcon";
import { CategoryType, FormMode } from "../../../../types";
import { getCategories } from "../../utils/queryCategories";
import Loading from "../../../components/Loading";
import MuiDrawer from "../../../components/MuiDrawer";
import Snackbar from "../../../components/Snackbar";
import DeleteIcon from "../../../../svgIcons/DeleteIcon";
import { Modal } from "@mui/material";
import TextInput from "../../../components/TextInput";
import { deleteCategoryQuery } from "../../utils/deleteCategoryQuery";

const CategoryForm = lazy(() => import("./CategoryForm"));

const Category = () => {
    const { theme } = useContext(ThemeContext);

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [message, setMessage] = useState<string | null>("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(false);

    const [selectedCategory, setSelectedCategory] =
        useState<CategoryType | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [deletedCategory, setDeletedCategory] = useState<CategoryType | null>(
        null
    );
    const [deleteCategory, setDeleteCategory] = useState<CategoryType | null>(
        null
    );
    const [deleteCategoryInput, setDeleteCategoryInput] = useState<string>("");

    const [openDrawer, setOpenDrawer] = useState<boolean>(false);
    const [formMode, setFormMode] = useState<FormMode>(FormMode.CREATE);

    const handleSelectedCategory = (category: CategoryType) => {
        setSelectedCategory(category);
    };

    const handleOpenDrawer = () => {
        setOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setSelectedCategory(null);
        setFormMode(FormMode.CREATE);
    };

    const handleOpenModal = (category: CategoryType) => {
        setOpenModal(true);
        setDeleteCategory(category);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setDeleteCategory(null);
        setDeleteCategoryInput("");
    };

    useEffect(() => {
        getCategories({ setCategories, setLoading, ignoreCache: false });
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            setFormMode(FormMode.READONLY);
            setOpenDrawer(true);
        }
    }, [selectedCategory]);

    const refetchCategories = async () => {
        await getCategories({ setCategories, setLoading, ignoreCache: true });
    };

    const handleDeleteCategory = async () => {
        await deleteCategoryQuery({
            categoryId: deleteCategory?.id,
            setErrorMessage,
            setMessage,
            setLoading,
            setDeletedCategory,
            refetchCategories,
        });
        handleCloseModal();
    };

    if (loading) return <Loading />;

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

            {message && deletedCategory && (
                <Snackbar
                    message={`${deletedCategory.name} ${message}`}
                    open={!!message}
                    severity="success"
                    onClose={() => {
                        setMessage("");
                        setDeletedCategory(null);
                    }}
                    autoHideDuration={4000}
                />
            )}
            <div className="flex justify-between mb-5">
                <h1
                    className={`text-lg ${theme === "dark" ? "text-white" : "text-emerald-900"} font-semibold`}
                >
                    Category tags
                </h1>
                <Tooltip content="Create new category tag" position="left">
                    <button
                        type="button"
                        onClick={handleOpenDrawer}
                        className="shadow-md shadow-gray-500 rounded-lg"
                    >
                        <AddIcon className="w-7 h-7" />
                    </button>
                </Tooltip>
            </div>

            <div className="grid grid-cols-12 gap-5 ml-5">
                {categories.map((category, index) => (
                    <div key={index} className="col-span-2 flex">
                        <button
                            onClick={() => handleSelectedCategory(category)}
                            className={`px-2 py-1 text-sm text-center ${theme === "dark" ? "text-white" : "text-black"} border rounded-l-xl`}
                        >
                            {category.name}
                        </button>
                        <button
                            onClick={() => handleOpenModal(category)}
                            className="border rounded-r-xl px-2"
                        >
                            <DeleteIcon className="w-3 h-3" />
                        </button>
                    </div>
                ))}
            </div>

            <MuiDrawer
                aria-hidden="false"
                anchor="right"
                open={openDrawer}
                onClose={handleCloseDrawer}
                PaperProps={{
                    sx: {
                        width: "90%",
                        padding: "20px",
                    },
                }}
            >
                <CategoryForm
                    selectedCategory={selectedCategory}
                    handleCloseDrawer={handleCloseDrawer}
                    refetchCategories={refetchCategories}
                    isSuccess={!!message}
                    setMessage={setMessage}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    formMode={formMode}
                    setFormMode={setFormMode}
                />
            </MuiDrawer>

            <Modal
                open={openModal}
                onClose={handleCloseModal}
                className="place-items-center place-content-center"
            >
                <div className="flex flex-col gap-3 w-[400px] bg-white p-4 border rounded-xl">
                    <h1>
                        Are you sure you want to delete{" "}
                        <span className="font-bold italic text-red-500">
                            {deleteCategory?.name}
                        </span>{" "}
                        category tag?
                    </h1>
                    <p className="text-center text-red-500">
                        Deleting this category will also remove all associated
                        services.
                    </p>

                    <p className="text-sm italic">
                        Please enter the "{deleteCategory?.name}" tag in the
                        text box to confirm.
                    </p>
                    <TextInput
                        type="text"
                        placeholder={deleteCategory?.name}
                        onChange={(
                            event: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => setDeleteCategoryInput(event.target.value)}
                        value={deleteCategoryInput}
                    />

                    <div className="flex gap-3 justify-between">
                        <button onClick={handleCloseModal}>Cancel</button>
                        <button
                            onClick={handleDeleteCategory}
                            disabled={
                                deleteCategoryInput !== deleteCategory?.name
                            }
                            className={`border-4 border-slate-300 bg-slate-400 ${deleteCategoryInput !== deleteCategory?.name ? "text-gray-300" : "text-white font-semibold"} rounded-lg p-2`}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default memo(Category);
