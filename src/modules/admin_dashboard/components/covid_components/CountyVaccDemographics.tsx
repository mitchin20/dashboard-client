import { memo, useState } from "react";
import { CountyMetricsProps } from "../../../../types";
import ConnectionOfBusinessmenIcon from "../../../../svgIcons/ConnectionOfBusinessmenIcon";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { StyledDiv } from "./styles";

const CountyVaccDemographics: React.FC<CountyMetricsProps> = ({ data }) => {
    const [panel1, setPanel1] = useState<boolean>(false);
    const [panel2, setPanel2] = useState<boolean>(false);
    const [panel3, setPanel3] = useState<boolean>(false);

    const byAge = data?.actuals?.vaccinationsInitiatedDemographics?.age;
    const byRace = data?.actuals?.vaccinationsInitiatedDemographics?.race;
    const bySex = data?.actuals?.vaccinationsInitiatedDemographics?.sex;

    const handlePanel1Change = () => {
        setPanel1(!panel1);
    };
    const handlePanel2Change = () => {
        setPanel2(!panel2);
    };
    const handlePanel3Change = () => {
        setPanel3(!panel3);
    };

    return (
        <div className="mt-10">
            <div className="flex font-bold">
                <ConnectionOfBusinessmenIcon className="h-6 w-6 mr-3" />
                <h1>Vaccination Demographics</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 xxs:text-xs xs:text-sm lg:text-base mt-5">
                {/* Accordion for "By Age" */}
                <div className="w-full">
                    <Accordion
                        expanded={panel1}
                        onChange={handlePanel1Change}
                        // className="w-full"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            By Age
                        </AccordionSummary>
                        <AccordionDetails>
                            {byAge &&
                                Object.entries(byAge).map((age: any, index) => (
                                    <StyledDiv key={index}>
                                        <span className="font-bold">
                                            {age[0]}
                                        </span>
                                        <span>{age[1]}</span>
                                    </StyledDiv>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                </div>

                {/* Accordion for "By Race" */}
                <div className="w-full">
                    <Accordion
                        expanded={panel2}
                        onChange={handlePanel2Change}
                        // className="w-full"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            By Race
                        </AccordionSummary>
                        <AccordionDetails>
                            {byRace &&
                                Object.entries(byRace).map(
                                    (race: any, index) => (
                                        <StyledDiv key={index}>
                                            <span className="font-bold">
                                                {race[0]}
                                            </span>
                                            <span>{race[1]}</span>
                                        </StyledDiv>
                                    )
                                )}
                        </AccordionDetails>
                    </Accordion>
                </div>

                {/* Accordion for "By Sex" */}
                <div className="w-full">
                    <Accordion
                        expanded={panel3}
                        onChange={handlePanel3Change}
                        // className="w-full"
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                        >
                            By Sex
                        </AccordionSummary>
                        <AccordionDetails>
                            {bySex &&
                                Object.entries(bySex).map((sex: any, index) => (
                                    <StyledDiv key={index}>
                                        <span className="font-bold">
                                            {sex[0]}
                                        </span>
                                        <span>{sex[1]}</span>
                                    </StyledDiv>
                                ))}
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default memo(CountyVaccDemographics);
