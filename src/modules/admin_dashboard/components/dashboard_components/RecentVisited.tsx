import { useEffect, useState } from "react";
import { getRecentPageVisited } from "../../../../helpers/recentPageVisited";
import Link from "../../../components/Link";

const RecentVisited = () => {
    const [pagesVisited, setPagesVisited] = useState<object[]>([]);

    useEffect(() => {
        setPagesVisited(getRecentPageVisited("recentPageVisited"));
    }, []);
    return (
        <div>
            <h1>Recent Page Visited</h1>
            {pagesVisited &&
                pagesVisited?.map((page: any, index: number) => (
                    <div key={index} className="p-2">
                        <Link href={page.url}>{page.name}</Link>
                    </div>
                ))}
        </div>
    );
};

export default RecentVisited;
