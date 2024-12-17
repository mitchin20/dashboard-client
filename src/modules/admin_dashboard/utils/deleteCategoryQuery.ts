import axios from "axios";
import { CategoryQueryProps } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

export const deleteCategoryQuery = async ({
    categoryId,
    setDeletedCategory,
    setErrorMessage,
    setLoading,
    setMessage,
    refetchCategories,
}: CategoryQueryProps) => {
    try {
        const response = await axios.delete(
            `${API_URL}/delete-category/${categoryId}`
        );

        if (response.status === 200) {
            setMessage("Category deleted successfully");
            if (setDeletedCategory) {
                setDeletedCategory(response.data.data);
            }
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to delete category");
        throw error;
    } finally {
        refetchCategories();
        setLoading(false);
    }
};
