import Card from "../../components/Card";
import HeaderText from "../../components/HeaderText";

const About = () => {
    return (
        <div
            id="about"
            className="w-full flex justify-center items-center h-1/3 my-20"
        >
            {/* Styling spinning border gradient */}
            <Card>
                <HeaderText>About Me</HeaderText>
                <p className="px-4 py-10 xxs:text-lg leading-10 z-50">
                    Throughout my career, I've had the opportunity to
                    contributing to projects at{" "}
                    <span className="font-bold gradient-text-1">Comcast</span>,
                    a leader in the{" "}
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
            </Card>
        </div>
    );
};

export default About;
