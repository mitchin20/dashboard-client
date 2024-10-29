const About = () => {
    return (
        <div
            id="about"
            className="w-full flex justify-center items-center h-1/3 my-20"
        >
            {/* Styling spinning border gradient */}
            <div
                className="
                        relative
                        lg:w-[50%]
                        md:w-[60%]
                        xxs:w-[95%] h-[400px] xxs:h-[500px] rounded-[10px]
                        overflow-hidden
                        before:absolute
                        shadow-2xl
                        shadow-slate-900
                        before:top-[-100%] before:right-[-100%] before:bottom-[-100%] before:left-[-100%]
                        before:bg-gradient-conic
                        before:animate-spin
                    "
            >
                <div className="absolute flex flex-col text-center justify-center align-middle top-[2px] right-[2px] bottom-[2px] left-[2px] px-4 md:bg-white md:text-black xxs:bg-gray-800 xxs:text-white rounded-[10px] transition duration-1000">
                    {/* Add the line before and after the text */}
                    <h4
                        className="
                            relative text-center 
                            font-bold text-3xl pt-8 pb-8 z-50 
                            before:content-[''] before:w-[100px] before:h-px md:before:bg-black xxs:before:bg-white before:mr-4 before:inline-block 
                            after:content-[''] after:w-[100px] after:h-px md:after:bg-black xxs:after:bg-white after:ml-4 after:inline-block"
                    >
                        About Me
                    </h4>

                    <p className="px-4 py-10 xxs:text-lg leading-10 z-50">
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
                </div>
            </div>
        </div>
    );
};

export default About;
