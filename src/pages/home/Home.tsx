import React, { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));

const Home = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Hero />
            <About />
        </Suspense>
    );
};

export default Home;
