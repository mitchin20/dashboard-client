export const getTheme = (key: string): any | null => {
    return localStorage.getItem(key);
};

export const setNewTheme = (key: string, value: string): void => {
    localStorage.setItem(key, value);
};
