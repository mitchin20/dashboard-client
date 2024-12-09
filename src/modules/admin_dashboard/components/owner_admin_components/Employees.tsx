import { lazy, memo, useEffect, useState } from "react";
import { getEmployees } from "../../utils/queryEmployees";
import Loading from "../../../components/Loading";
import Tooltip from "../../../components/Tooltip";
import MuiDrawer from "../../../components/MuiDrawer";
import Snackbar from "../../../components/Snackbar";

const EmployeeForm = lazy(() => import("./EmployeeForm"));

type EmployeesType = {
    id: number;
    fristName: string;
    lastName: string;
    fullName: string;
    color: string;
    phone: string;
    email: string;
};

const Employees = () => {
    const [employees, setEmployees] = useState<EmployeesType[]>([]);
    const [selectedEmployee, setSelectedEmployee] =
        useState<EmployeesType | null>(null);
    const [message, setMessage] = useState<string | null>("");
    const [errorMessage, setErrorMessage] = useState<string | null>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [showUserDrawer, setShowUserDrawer] = useState<boolean>(false);

    const handleSelectEmployee = (employee: EmployeesType) => {
        setSelectedEmployee(employee);
    };

    const handleOpenUserDrawer = () => {
        setShowUserDrawer(true);
    };

    const handleCloseUserDrawer = () => {
        setShowUserDrawer(false);
    };

    useEffect(() => {
        getEmployees({ setEmployees, setLoading, ignoreCache: false });
    }, []);

    const refetchEmployees = async () => {
        getEmployees({ setEmployees, setLoading, ignoreCache: true });
    };

    // console.log("employees: ", selectedEmployee);

    if (loading) return <Loading />;

    return (
        <div>
            {message && (
                <Snackbar
                    message={message}
                    open={!!message}
                    severity="success"
                    onClose={() => setMessage("")}
                    autoHideDuration={3000}
                />
            )}
            <div className="flex justify-between">
                <h4 className="text-lg text-emerald-900 font-semibold">
                    Employees
                </h4>
                <Tooltip content="Add new employee" position="bottom">
                    <button onClick={handleOpenUserDrawer}>Add</button>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-3">
                {employees.map((employee, index) => (
                    <div
                        key={index}
                        className="flex justify-between ml-5 p-2 border rounded-lg hover:bg-slate-100"
                    >
                        <button
                            onClick={() => handleSelectEmployee(employee)}
                            className="border rounded-full py-2 px-4 bg-white"
                        >
                            {employee.fullName}
                        </button>
                        <button className="border rounded-full p-2 bg-white">
                            Remove
                        </button>
                    </div>
                ))}
            </div>

            <MuiDrawer
                anchor="right"
                open={showUserDrawer}
                onClose={handleCloseUserDrawer}
                PaperProps={{
                    sx: {
                        width: "90%",
                        padding: "20px",
                    },
                }}
            >
                <div>
                    <h1 className="text-xl font-semibold mb-3">
                        Add new employee
                    </h1>
                    <EmployeeForm
                        selectedEmployee={selectedEmployee}
                        handleCloseDrawer={handleCloseUserDrawer}
                        refetchEmployees={refetchEmployees}
                        isSuccess={!!message}
                        setMessage={setMessage}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                    />
                </div>
            </MuiDrawer>
        </div>
    );
};

export default memo(Employees);
