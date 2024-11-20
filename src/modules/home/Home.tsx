import React, { lazy, Suspense, useRef } from "react";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const TechStacks = lazy(() => import("./components/TechStacks"));
const Contact = lazy(() => import("./components/Contact"));

const Home = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <Hero />
            <About />
            <TechStacks />
            <Contact />
        </Suspense>
    );
};

export default Home;
