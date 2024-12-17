import axios from "axios";
import { CategoryQueryProps } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

export const updateCategoryQuery = async ({
    categoryId,
    data,
    setErrorMessage,
    setMessage,
    setLoading,
    refetchCategories,
}: CategoryQueryProps) => {
    try {
        const response = await axios.put(
            `${API_URL}/update-category/${categoryId}`,
            data
        );

        if (response.status === 200) {
            setMessage("Category updated successfully");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to update category");
        throw error;
    } finally {
        refetchCategories();
        setLoading(false);
    }
};
