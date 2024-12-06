import { lazy, Suspense } from "react";
import LoadingIcon2 from "../../svgIcons/LoadingIcon2";

const Header = lazy(() => import("./components/Header"));
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const TechStacks = lazy(() => import("./components/TechStacks"));
const Contact = lazy(() => import("./components/Contact"));

const Home = () => {
    return (
        <Suspense fallback={<LoadingIcon2 className="w-20 h-20" />}>
            <Header />
            <Hero />
            <About />
            <TechStacks />
            <Contact />
        </Suspense>
    );
};

export default Home;
