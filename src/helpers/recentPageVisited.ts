export const getRecentPageVisited = (key: string): any | null => {
    const pageVisited = localStorage.getItem(key);

    if (!pageVisited) {
        return null;
    }

    try {
        const parsedPages = JSON.parse(pageVisited);
        return Array.isArray(parsedPages) ? parsedPages : [];
    } catch (error) {
        console.error("Error parsing JSON:", error);
        return [];
    }
};

export const setRecentPageVisited = (
    key: string,
    value: Record<string, any>
): void => {
    const pagesVisited = getRecentPageVisited(key) || [];

    const isExisting = pagesVisited.some(
        (page: Record<string, any>) =>
            page.name === value.name && page.url === value.url
    );

    if (isExisting) {
        return;
    }

    const updatedPages = [...pagesVisited, value];
    localStorage.setItem(key, JSON.stringify(updatedPages));
};
