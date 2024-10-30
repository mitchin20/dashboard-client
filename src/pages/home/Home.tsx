import React, { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const TechStacks = lazy(() => import("./components/TechStacks"));

const Home = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Hero />
            <About />
            <TechStacks />
        </Suspense>
    );
};

export default Home;
