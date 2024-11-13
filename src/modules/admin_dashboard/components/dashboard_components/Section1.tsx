import React, { memo, useContext } from "react";
import Card2 from "../../../components/Card2";
import CardHeader from "../../../components/CardHeader";
import CardContent from "../../../components/CardContent";
import { ThemeContext } from "../../../../context/ThemeContext";

const Section1 = () => {
    const { theme } = useContext(ThemeContext);
    return (
        <Card2
            className={`mb-10 p-10 shadow-md ${theme === "dark" && "bg-gray-800"}`}
        >
            <CardHeader>
                <h1 className={`font-semibold text-2xl`}>Summary</h1>
            </CardHeader>
            <CardContent>
                <p className="my-5 md:leading-8 sm:leading-6">
                    This portfolio demonstrates my capabilities through
                    thoughtfully crafted components, tools, and features that
                    exemplify my technical proficiency. From front-end design
                    with modern libraries and responsive frameworks to robust
                    back-end services and API integrations, each aspect of this
                    project highlights my attention to detail and commitment to
                    clean, scalable code. Dive in to explore the architecture,
                    functionality, and technologies that power this portfolio,
                    offering a glimpse into the depth of my technical skill set.
                </p>
            </CardContent>
        </Card2>
    );
};

export default memo(Section1);
