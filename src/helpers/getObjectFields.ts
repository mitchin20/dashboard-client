export const getObjectFields = (obj: any, fields: string[]) => {
    // Check if obj is an object
    if (typeof obj !== "object" || obj === null) {
        return {};
    }
    // Return an object with the specified fields
    return fields.reduce((acc: any, field: string) => {
        acc[field] = obj[field] ?? null;
        return acc;
    }, {});
};
