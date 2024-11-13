import { useContext, useEffect, useState } from "react";
import { getRecentPageVisited } from "../../../../helpers/recentPageVisited";
import { Link as RouterLink } from "react-router-dom";
import { ThemeContext } from "../../../../context/ThemeContext";

const RecentVisited = () => {
    const { theme } = useContext(ThemeContext);
    const [pagesVisited, setPagesVisited] = useState<object[]>([]);

    useEffect(() => {
        setPagesVisited(getRecentPageVisited("recentPageVisited"));
    }, []);
    return (
        pagesVisited && (
            <div
                className={`p-10 rounded-2xl shadow-md shadow-gray-800 ${theme === "dark" && "bg-gray-800"}`}
            >
                <h1 className="mb-4">Recent Visited</h1>
                {pagesVisited.length > 0 &&
                    pagesVisited?.map((page: any, index: number) => (
                        <div key={index} className="px-5 py-2">
                            <RouterLink to={page.url}>{page.name}</RouterLink>
                        </div>
                    ))}
            </div>
        )
    );
};

export default RecentVisited;
