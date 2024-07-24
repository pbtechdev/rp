export const setItem = (key, value) => {
    if (!value) return null;
    localStorage.setItem(key, JSON.stringify(value));
}

export const getItem = (key) => {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null;
};