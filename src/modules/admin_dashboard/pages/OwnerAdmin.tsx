import { lazy, useState } from "react";
import { ServiceDetail } from "../../../types";

const Employees = lazy(
    () => import("../components/owner_admin_components/Employees")
);
const Category = lazy(
    () => import("../components/services_components/Category")
);
const Services = lazy(
    () => import("../components/services_components/Services")
);

const OwnerAdmin = () => {
    const [services, setServices] = useState<ServiceDetail[]>([]);

    return (
        <div className="flex flex-col gap-5 mt-5">
            <h1 className="text-3xl mb-5">Owner Dashboard (In Development)</h1>
            <div>
                <Employees />
            </div>
            <div>
                <Category services={services} setServices={setServices} />
            </div>
            <div>
                <Services services={services} setServices={setServices} />
            </div>
            <div>
                <h4 className="text-lg text-emerald-900 font-semibold">
                    Customers
                </h4>
            </div>
        </div>
    );
};

export default OwnerAdmin;
