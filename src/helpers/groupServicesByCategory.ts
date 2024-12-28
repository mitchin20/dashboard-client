import { ServiceDetail } from "../types";

export const groupServiceByCategory = (services: ServiceDetail[]) => {
    if (!services) return {};
    return services.reduce((acc: Record<string, ServiceDetail[]>, service) => {
        const { category } = service;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(service);
        return acc;
    }, {});
};
