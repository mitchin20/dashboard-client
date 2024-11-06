// src/index.js or src/App.js
import "./index.css";
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/dashboard/Dashboard";

const Home = lazy(() => import("./modules/home/Home"));
const Dashboard = lazy(() => import("./modules/dashboard/Dashboard"));

function App() {
    return (
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Suspense>
        </Router>
    );
}

export default App;
