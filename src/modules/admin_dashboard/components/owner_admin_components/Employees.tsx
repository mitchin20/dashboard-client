import { lazy, memo, useEffect, useState } from "react";
import { getEmployees } from "../../utils/queryEmployees";
import Loading from "../../../components/Loading";
import Tooltip from "../../../components/Tooltip";
import MuiDrawer from "../../../components/MuiDrawer";
import Snackbar from "../../../components/Snackbar";
import AddIcon from "../../../../svgIcons/AddIcon";
import DeleteIcon from "../../../../svgIcons/DeleteIcon";
import { FormMode } from "../../../../types";

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
    const [formMode, setFormMode] = useState<FormMode>(FormMode.CREATE);

    const handleSelectEmployee = (employee: EmployeesType) => {
        setSelectedEmployee(employee);
    };

    const handleOpenUserDrawer = () => {
        setShowUserDrawer(true);
    };

    const handleCloseUserDrawer = () => {
        setShowUserDrawer(false);
        setSelectedEmployee(null);
        setFormMode(FormMode.CREATE);
    };

    useEffect(() => {
        getEmployees({ setEmployees, setLoading, ignoreCache: false });
    }, []);

    useEffect(() => {
        if (selectedEmployee) {
            handleOpenUserDrawer();
            setFormMode(FormMode.READONLY);
        }
    }, [selectedEmployee]);

    const refetchEmployees = async () => {
        getEmployees({ setEmployees, setLoading, ignoreCache: true });
    };

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
            <div className="flex justify-between mb-5">
                <h4 className="text-lg text-emerald-900 font-semibold">
                    Employees
                </h4>
                <Tooltip content="Add new employee" position="bottom">
                    <button
                        type="button"
                        onClick={handleOpenUserDrawer}
                        className="shadow-md shadow-gray-500 rounded-lg"
                    >
                        <AddIcon className="w-7 h-7" />
                    </button>
                </Tooltip>
            </div>
            <div className="flex flex-col gap-3">
                {employees.map((employee, index) => (
                    <div
                        key={index}
                        className="flex justify-between items-center ml-5 p-2 border rounded-lg hover:bg-slate-100"
                    >
                        <button
                            onClick={() => handleSelectEmployee(employee)}
                            className="border rounded-full py-1 px-4 bg-white"
                        >
                            {employee.fullName}
                        </button>
                        <Tooltip
                            content="Delete user (In Development)"
                            position="bottom"
                        >
                            <button className="">
                                <DeleteIcon className="w-6 h-6" />
                            </button>
                        </Tooltip>
                    </div>
                ))}
            </div>

            <MuiDrawer
                aria-hidden="false"
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
                    <EmployeeForm
                        selectedEmployee={selectedEmployee}
                        handleCloseDrawer={handleCloseUserDrawer}
                        refetchEmployees={refetchEmployees}
                        isSuccess={!!message}
                        setMessage={setMessage}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        formMode={formMode}
                        setFormMode={setFormMode}
                    />
                </div>
            </MuiDrawer>
        </div>
    );
};

export default memo(Employees);
