import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";

const API_URL =
    process.env.NEXT_PUBLIC_SERVER_URL || process.env.REACT_APP_SERVER_URL;
const ttl = 10 * 60 * 1000;

type QueryCategoryType = {
    setCategories: (data: any) => void;
    setLoading: (data: boolean) => void;
    ignoreCache: boolean;
};

type CategoryType = {
    id: number;
    name: string;
};

export const getCategories = async ({
    setCategories,
    setLoading,
    ignoreCache,
}: QueryCategoryType) => {
    try {
        setLoading(true);
        const cachedCategories: CategoryType[] =
            getSessionStorage("categories");
        if (cachedCategories && !ignoreCache) {
            setCategories(cachedCategories);
            return;
        }
        const response = await axios.get(`${API_URL}/categories`);
        const responseData: CategoryType[] = response?.data?.data;
        setCategories(responseData);
        setSessionStorage("categories", responseData, ttl);
    } catch (error) {
        console.error("Error fetching categories data:", error);
    } finally {
        setLoading(false);
    }
};
