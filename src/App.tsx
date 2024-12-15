import "./index.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Loading from "./modules/components/Loading";

const Home = lazy(() => import("./modules/home/Home"));
const AdminDashboard = lazy(
    () => import("./modules/admin_dashboard/AdminDashboard")
);
const DefaultAdminDashboard = lazy(
    () => import("./modules/admin_dashboard/pages/DefaultAdminDashboard")
);
const StatesCovidData = lazy(
    () => import("./modules/admin_dashboard/pages/StatesCovidData")
);
const CountyCovidData = lazy(
    () => import("./modules/admin_dashboard/pages/CountyCovidData")
);
const BingoGame2 = lazy(
    () => import("./modules/admin_dashboard/pages/BingoGame2")
);
const BauCuaTomCa = lazy(
    () => import("./modules/admin_dashboard/pages/BauCuaTomCa")
);
const Booking = lazy(() => import("./modules/admin_dashboard/pages/Booking"));
const Appointments = lazy(
    () => import("./modules/admin_dashboard/pages/Appointments")
);
const OwnerAdmin = lazy(
    () => import("./modules/admin_dashboard/pages/OwnerAdmin")
);

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        <Route
                            path="/admin-dashboard"
                            element={<AdminDashboard />}
                        >
                            <Route index element={<DefaultAdminDashboard />} />
                            <Route path="booking" element={<Booking />} />
                            <Route
                                path="appointments"
                                element={<Appointments />}
                            />
                            <Route
                                path="owner-admin"
                                element={<OwnerAdmin />}
                            />
                            <Route
                                path="states-covid19"
                                element={<StatesCovidData />}
                            />
                            <Route
                                path="county-covid19"
                                element={<CountyCovidData />}
                            />
                            <Route path="bingo" element={<BingoGame2 />} />
                            <Route
                                path="bau-cua-tom-ca"
                                element={<BauCuaTomCa />}
                            />
                        </Route>
                    </Routes>
                </Suspense>
            </Router>
        </ThemeProvider>
    );
}

export default App;
