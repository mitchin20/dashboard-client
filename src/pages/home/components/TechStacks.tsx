import { techStackList } from "./techStacks/techStacks";
import Card from "../../components/Card";
import HeaderText from "../../components/HeaderText";

const TechStacks = () => {
    return (
        <div className="py-14">
            <div className="grid grid-cols-2 grid-flow-row gap-4 px-4 min-w-0 md:grid-cols-3 md:w-1/2 md:mx-auto">
                {techStackList.map(
                    ({ name, icon: Icon, textColor, textStyle }, index) => (
                        <Card
                            key={index}
                            width="w-full"
                            height="h-[100px]"
                            disableSpinAnimation
                            slideEffect
                            cardContentStyles={`top-[1px] 
                right-[1px] bottom-[1px] left-[1px] hover:bg-gray-500`}
                        >
                            <div
                                className={`flex flex-col justify-center items-center ${textColor} ${textStyle} xxs:hover:text-xl xxs:hover:text-white transition duration-500`}
                            >
                                <h1 className={` mb-2`}>{name}</h1>
                                <Icon className="xxs:w-7 xxs:h-7 hover:animate-spin" />
                            </div>
                        </Card>
                    )
                )}
            </div>
            <div className="w-full flex justify-center items-center h-1/3 my-20">
                <Card
                    width="xxs:w-[95%] md:w-[60%] lg:w-[50%]"
                    height="h-[400px]"
                    cardContentStyles="md:bg-white md:text-black xxs:bg-gray-900 xxs:text-white"
                >
                    <p className="px-4 py-10 xxs:text-base leading-10 z-1 italic">
                        "Over the years, I have built and refined expertise
                        across a wide range of modern technologies, frameworks,
                        and tools that drive efficient and innovative web
                        application development. From front-end libraries like
                        React and Next.js to back-end environments such as
                        Node.js and Express, I leverage these technologies to
                        create scalable, reliable applications. My experience
                        also extends to cloud services, databases, and agile
                        practices, ensuring well-rounded, high-quality
                        solutions."
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default TechStacks;
