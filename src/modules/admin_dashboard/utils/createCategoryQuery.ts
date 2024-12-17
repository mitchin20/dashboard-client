import axios from "axios";
import { CategoryQueryProps } from "../../../types";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;

export const createCategoryQuery = async ({
    data,
    setErrorMessage,
    setMessage,
    setLoading,
    refetchCategories,
}: CategoryQueryProps) => {
    try {
        const response = await axios.post(`${API_URL}/create-category`, data);

        if (response.status === 200) {
            setMessage("Category created successfully");
        }
    } catch (error) {
        console.error(error);
        setErrorMessage("Failed to create category");
        throw error;
    } finally {
        refetchCategories();
        setLoading(false);
    }
};
