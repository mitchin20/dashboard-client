import { lazy } from "react";

const Employees = lazy(
    () => import("../components/owner_admin_components/Employees")
);

const OwnerAdmin = () => {
    return (
        <div>
            <h1>Owner Dashboard (In Development)</h1>
            <div className="grid grid-cols-2 gap-x-5">
                <div>
                    <Employees />
                </div>
                <div>
                    <h4 className="text-lg text-emerald-900 font-semibold">
                        Customers
                    </h4>
                </div>
            </div>
            <div>
                <h4 className="text-lg text-emerald-900 font-semibold">
                    Services
                </h4>
            </div>
        </div>
    );
};

export default OwnerAdmin;
