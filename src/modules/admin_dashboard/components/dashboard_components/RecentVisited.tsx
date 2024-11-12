import { useEffect, useState } from "react";
import { getRecentPageVisited } from "../../../../helpers/recentPageVisited";
import { Link as RouterLink } from "react-router-dom";

const RecentVisited = () => {
    const [pagesVisited, setPagesVisited] = useState<object[]>([]);

    useEffect(() => {
        setPagesVisited(getRecentPageVisited("recentPageVisited"));
    }, []);
    return (
        pagesVisited && (
            <div>
                <h1>Recent Visited</h1>
                {pagesVisited.length > 0 &&
                    pagesVisited?.map((page: any, index: number) => (
                        <div key={index} className="p-2">
                            <RouterLink to={page.url}>{page.name}</RouterLink>
                        </div>
                    ))}
            </div>
        )
    );
};

export default RecentVisited;
