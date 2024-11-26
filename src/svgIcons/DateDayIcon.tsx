import React from "react";

interface DateDayIconProps {
    className?: string;
}

const DateDayIcon: React.FC<DateDayIconProps> = ({ className }) => {
    return (
        <svg
            viewBox="0 0 48 48"
            enableBackground="new 0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <g>
                <polygon
                    fill="currentColor"
                    points="25.916,8 25.916,23.359 32.992,30.434 30.164,33.262 21.9,25 21.916,24.982 21.916,8  "
                />

                <path
                    d="M2.216,34.139H0v4.746h2.216c0.271,1.059,0.711,2.051,1.306,2.934l-1.521,1.522l2.693,2.691l1.544-1.543   c0.852,0.554,1.797,0.972,2.808,1.23v2.216h4.761V45.72c1.033-0.267,2.002-0.694,2.867-1.269l1.486,1.484l2.692-2.691l-1.485-1.484   c0.572-0.863,1-1.83,1.268-2.861h2.218v-4.776h-2.218c-0.262-1.007-0.677-1.951-1.23-2.8l1.448-1.449l-2.692-2.691l-1.426,1.424   c-0.879-0.59-1.865-1.028-2.918-1.301v-2.221h-4.78v2.221c-1.03,0.268-1.994,0.693-2.858,1.266l-1.483-1.485l-2.693,2.694   l1.484,1.484C2.909,32.131,2.481,33.104,2.216,34.139z M7.51,36.511c0-2.163,1.754-3.917,3.916-3.917   c2.164,0,3.918,1.754,3.918,3.917s-1.754,3.917-3.918,3.917C9.264,40.428,7.51,38.674,7.51,36.511z"
                    fill="currentColor"
                />

                <path
                    d="M0.025,22.997v2.007C0.012,24.67,0,24.336,0,24S0.012,23.33,0.025,22.997z"
                    fill="currentColor"
                />

                <path
                    d="M35.012,2.665C33.524,1.9,31.993,1.318,30.443,0.89c-0.074-0.021-0.149-0.04-0.225-0.06   c-0.362-0.096-0.726-0.186-1.091-0.264c-0.225-0.05-0.451-0.095-0.679-0.138c-0.199-0.037-0.399-0.071-0.599-0.103   c-0.354-0.058-0.71-0.109-1.069-0.151c-0.027-0.003-0.056-0.006-0.084-0.009C25.811,0.064,24.913,0,24,0   C11.11,0,0.598,10.162,0.027,22.911h4.028C4.624,12.375,13.322,4,24,4c0.416,0,0.828,0.013,1.236,0.039l0.007,0.021   c0.928,0.054,1.856,0.177,2.78,0.362c0.184,0.038,0.367,0.076,0.548,0.119c0.106,0.024,0.212,0.05,0.317,0.076   c1.484,0.379,2.902,0.922,4.235,1.609l0.021-0.021c0.012,0.006,0.024,0.011,0.036,0.018c4.233,2.179,7.354,5.662,9.136,9.704   l-0.026,0.026C43.382,18.415,44,21.132,44,24c0,11.046-8.954,20-20,20v4c9.3,0,17.358-5.293,21.343-13.027l0.028,0.015   C51.435,23.2,46.797,8.73,35.012,2.665z"
                    fill="currentColor"
                />
            </g>
        </svg>
    );
};

export default DateDayIcon;