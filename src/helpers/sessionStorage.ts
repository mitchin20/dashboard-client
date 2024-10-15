const setSessionStorage = (key: string, value: any, ttl: number): void => {
    const now = new Date();
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
};

const getSessionStorage = (key: string): any | null => {
    const itemStr = sessionStorage.getItem(key);

    if (!itemStr) {
        return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
        sessionStorage.removeItem(key);
        return null;
    }

    return item.value;
};

export { setSessionStorage, getSessionStorage };
