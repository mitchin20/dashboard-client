import axios from "axios";
import {
    getSessionStorage,
    setSessionStorage,
} from "../../../helpers/sessionStorage";
import { DownloadResponse } from "../../../types";

const API_URL =
    process.env.REACT_APP_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
const ttl = 24 * 60 * 60 * 1000;

export const downloadResume = async () => {
    const cachedData = getSessionStorage("download-url");
    if (cachedData) {
        const link = document.createElement("a");
        link.href = cachedData;
        link.download = "resume.pdf";
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.click();
        return;
    }

    try {
        const response = await axios.get<DownloadResponse>(
            `${API_URL}/download-resume`
        );
        if (!response.data.success) {
            console.error(
                response.data.message || "Failed to fetch the download URL."
            );
        } else {
            setSessionStorage("download-url", response.data.url, ttl);
            const link = document.createElement("a");
            link.href = response.data.url || "";
            link.download = "resume.pdf";
            link.target = "_blank";
            link.rel = "noopener noreferrer";
            link.click();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};
