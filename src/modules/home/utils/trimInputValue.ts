export const trimInputsValue = (payload: any) => {
    return Object.keys(payload).reduce(
        (acc: Record<string, any>, key: string) => {
            const value = payload[key];
            if (typeof value === "string") {
                acc[key] = value.trim();
            } else {
                acc[key] = value;
            }

            return acc;
        },
        {} as Record<string, any>
    );
};
