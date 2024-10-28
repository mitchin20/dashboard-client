import React, { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header"));

const Home = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center text-gray-800">
                    Welcome to My Dashboard
                </h1>
                <p className="text-lg text-center text-gray-600 mt-4">
                    This is a simple dashboard page built with React and
                    Tailwind CSS.
                </p>
            </main>
        </Suspense>
    );
};

export default Home;
