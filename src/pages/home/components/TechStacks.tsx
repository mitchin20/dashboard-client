import { techStackList } from "./techStacks/techStacks";
import Card from "../../components/Card";
import Card2 from "../../components/Card2";
import CardContent from "../../components/CardContent";

const TechStacks = () => {
    return (
        <div className="py-10 px-4">
            <div className="grid grid-cols-2 grid-flow-row gap-4 min-w-0 md:grid-cols-3 md:w-3/4 md:mx-auto lg:w-1/2 my-10">
                {techStackList.map(({ name, icon: Icon, textColor }, index) => (
                    <Card2
                        key={index}
                        slideEffect
                        className="relative h-auto w-full rounded-[10px] overflow-hidden before:absolute before:inset-[-200%] hover:before:animate-spin before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[1px]"
                    >
                        <div
                            className={`relative h-full z-1 bg-white hover:bg-gray-700 hover:text-white xxs:hover:text-lg xs:hover:text-lg rounded-[10px] p-2 transition duration-500 ${textColor}`}
                        >
                            <CardContent
                                className={`flex flex-col justify-center items-center text-center`}
                            >
                                <p className="pb-2">{name}</p>
                                <Icon className="w-7 h-7 hover:animate-bounce" />
                            </CardContent>
                        </div>
                    </Card2>
                ))}
            </div>
            <div className="w-full flex justify-center h-1/3 mt-20 mb-10">
                <Card2 className="relative h-auto w-full md:w-1/2 lg:w-1/3 rounded-[10px] overflow-hidden before:absolute before:inset-[-200%] hover:before:animate-spin before:bg-gradient-conic before:rounded-[10px] before:-z-10 p-[1px] hover:p-[2px] transition duration-500">
                    <div
                        className={`relative h-full z-1 bg-white rounded-[10px] p-2`}
                    >
                        <CardContent>
                            <p className="py-10 text-center text-gray-900 xxs:text-sm xs:text-base leading-10 z-1 italic">
                                "Over the years, I have built and refined
                                expertise across a wide range of modern
                                technologies, frameworks, and tools that drive
                                efficient and innovative web application
                                development. From front-end libraries like React
                                and Next.js to back-end environments such as
                                Node.js and Express, I leverage these
                                technologies to create scalable, reliable
                                applications. My experience also extends to
                                cloud services, databases, and agile practices,
                                ensuring well-rounded, high-quality solutions."
                            </p>
                        </CardContent>
                    </div>
                </Card2>
            </div>
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto pt-20 pb-5">
                <div className="flex justify-center items-center text-gray-900 border-solid border-2 border-gray-500 rounded-full py-1 bg-white-gradient-conic xxs:text-sm">
                    <p className="mr-3 italic">Start with a</p>
                    <a
                        href="/dashboard"
                        className="border-solid border-[1px] border-gray-500 rounded-full p-4 bg-white font-thin hover:font-normal hover:italic hover:px-6 transform duration-700"
                    >
                        Demo
                    </a>
                    <p className="ml-3 italic">and explore</p>
                </div>
            </div>
        </div>
    );
};

export default TechStacks;
