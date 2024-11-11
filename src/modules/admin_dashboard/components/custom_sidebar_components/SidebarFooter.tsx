import React, { memo } from "react";
import GitHubIcon from "../../../../svgIcons/GitHubIcon";
import Link from "../../../components/Link";
import Card2 from "../../../components/Card2";
import CardContent from "../../../components/CardContent";

const GITHUB_URL = "https://github.com/mitchin20/dashboard-client";

interface SidebarFooterProps {
    collapsed?: boolean;
    theme?: "light" | "dark";
}

const SidebarFooter: React.FC<SidebarFooterProps> = ({ collapsed, theme }) => {
    return (
        <div
            className={`sticky bottom-0 z-50 ${theme === "dark" ? "bg-gray-950" : "bg-gray-50"} ${collapsed ? "p-5" : "p-10"} border-t-[1px] border-solid`}
        >
            {collapsed ? (
                <div className="flex justify-center h-auto">
                    <Link href={GITHUB_URL} target="_blank">
                        <GitHubIcon
                            className={`h-12 w-12 ${theme === "dark" ? "text-white" : "text-black"}`}
                        />
                    </Link>
                </div>
            ) : (
                <div className="h-auto w-full text-white">
                    <Card2
                        slideEffect
                        className="relative h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-200%] hover:before:animate-spin before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[2px]"
                    >
                        <div
                            className={`relative h-full z-1 bg-gray-500 hover:bg-gray-400 hover:text-white xxs:hover:text-lg xs:hover:text-lg rounded-[10px] p-2 transition duration-500`}
                        >
                            <CardContent
                                className={`flex flex-col justify-center items-center text-center`}
                            >
                                <GitHubIcon className="h-12 w-12" />
                                <p className="italic text-xs my-5">
                                    GitHub repository
                                </p>
                                <Link
                                    href={GITHUB_URL}
                                    target="_blank"
                                    className="no-underline text-white text-sm border-solid border-2 border-gray-600 p-2 hover:text-gray-600 hover:bg-white-gradient-conic rounded-full shadow-sm hover:shadow-black transform duration-700 ease-in-out"
                                >
                                    View Code
                                </Link>
                            </CardContent>
                        </div>
                    </Card2>
                </div>
            )}
        </div>
    );
};

export default memo(SidebarFooter);
