import "./index.css";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Loading2 from "./modules/components/Loading2";

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
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading2 />;
    }

    return (
        <ThemeProvider>
            <Router>
                <Suspense fallback={<Loading2 />}>
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
