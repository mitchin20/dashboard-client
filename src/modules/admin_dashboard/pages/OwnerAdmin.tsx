import { lazy } from "react";

const Employees = lazy(
    () => import("../components/owner_admin_components/Employees")
);

const OwnerAdmin = () => {
    return (
        <div className="mt-5">
            <h1 className="text-3xl mb-5">Owner Dashboard (In Development)</h1>
            <div>
                <Employees />
            </div>
            <div>
                <h4 className="text-lg text-emerald-900 font-semibold">
                    Services
                </h4>
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
