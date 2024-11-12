import React, { memo } from "react";
import Card2 from "../../../components/Card2";
import CardHeader from "../../../components/CardHeader";
import CardContent from "../../../components/CardContent";
import Link from "../../../components/Link";
import GitHubIcon from "../../../../svgIcons/GitHubIcon";

const CLIENT_GITHUB_URL = "https://github.com/mitchin20/dashboard-client";
const SERVER_GITHUB_URL = "https://github.com/mitchin20/dashboard-server";

const Section2 = () => {
    const listStyle = `flex gap-5 p-2 border-b-[1px]`;
    return (
        <Card2 className={`mb-10 p-10 shadow-md`}>
            <CardHeader>
                <h1 className={`font-semibold text-2xl`}>Technologies Used</h1>
            </CardHeader>
            <CardContent>
                <div className={`${listStyle}`}>
                    <p>Client:</p>
                    <p className="flex justify-center items-center gap-5">
                        React, TypeScript{" "}
                        <span>
                            <Link href={CLIENT_GITHUB_URL} target="_blank">
                                <GitHubIcon className={`w-5 h-5`} />
                            </Link>
                        </span>
                    </p>
                </div>
                <div className={`${listStyle}`}>
                    <p>Server:</p>
                    <p className="flex justify-center items-center gap-5">
                        Node.js, TypeScript{" "}
                        <span>
                            <Link href={SERVER_GITHUB_URL} target="_blank">
                                <GitHubIcon className={`w-5 h-5`} />
                            </Link>
                        </span>
                    </p>
                </div>
                <p className="italic mt-5">
                    "My portfolio is built with a client-server architecture,
                    with the client-side (React and TypeScript) and server-side
                    (Node.js and TypeScript using a microservices approach)
                    hosted as separate projects on individual GitHub
                    repositories. This separation ensures modularity, easier
                    maintenance, and independent updates for each layer of the
                    application."
                </p>
            </CardContent>
        </Card2>
    );
};

export default memo(Section2);
