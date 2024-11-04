import Card2 from "../../components/Card2";
import CardContent from "../../components/CardContent";
import CardHeader from "../../components/CardHeader";

const About = () => {
    return (
        <div
            id="about"
            className="w-full flex justify-center items-center my-4 px-2"
        >
            <Card2
                className="relative h-auto w-full md:w-1/2 lg:w-1/3 text-center rounded-[10px] overflow-hidden before:absolute 
               before:inset-[-200%] before:bg-gradient-conic before:animate-spin before:rounded-[10px] 
               before:-z-10 p-[2px]"
            >
                <div className="relative h-full z-1 text-white bg-gray-900 md:text-black md:bg-white rounded-[10px] p-2 transition duration-500">
                    <CardHeader className="py-10">About Me</CardHeader>
                    <CardContent className="flex items-center justify-center py-20">
                        <p>
                            Throughout my career, I've had the opportunity to
                            contributing to projects at{" "}
                            <span className="font-bold gradient-text-1">
                                Comcast
                            </span>
                            , a leader in the{" "}
                            <span className="font-bold gradient-text-1">
                                telecommunications industry
                            </span>
                            . This experience has allowed me to{" "}
                            <span className="font-bold gradient-text-2">
                                impact thousands of users
                            </span>{" "}
                            with my work. I'm passionate about building{" "}
                            <span className="font-bold gradient-text-0">
                                accessible web applications
                            </span>{" "}
                            that enhance user experience and{" "}
                            <span className="font-bold gradient-text-2">
                                solve real-world problems.
                            </span>
                        </p>
                    </CardContent>
                </div>
            </Card2>
        </div>
    );
};

export default About;
