// src/index.js or src/App.js
import "./index.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./modules/home/Home"));
const Dashboard = lazy(() => import("./modules/dashboard/Dashboard"));
const AdminDashboard = lazy(
    () => import("./modules/admin_dashboard/AdminDashboard")
);

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin-dashboard" element={<AdminDashboard />}>
                        <Route path="covid19" element={<div>Covid19</div>} />
                        <Route path="weather" element={<div>Weather</div>} />
                        <Route path="charts" element={<div>Charts</div>} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
