import "./index.css";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";

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

function App() {
    return (
        <ThemeProvider>
            <Router>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
                        <Route
                            path="/admin-dashboard"
                            element={<AdminDashboard />}
                        >
                            <Route index element={<DefaultAdminDashboard />} />
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
