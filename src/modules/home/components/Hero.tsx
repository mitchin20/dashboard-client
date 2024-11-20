import "../Home.css";
import { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import DownloadIcon from "../../../svgIcons/DownloadIcon";
import BuildIcon from "../../../svgIcons/BuildIcon";
import Link from "../../components/Link";
import { createRipple } from "../utils/createRuppleEffect";
import { downloadResume } from "../utils/downloadResume";
import {
    drag as d3Drag,
    forceCenter,
    forceLink,
    forceManyBody,
    forceSimulation,
    select,
    SimulationNodeDatum,
} from "d3";

interface Node extends SimulationNodeDatum {
    id: string;
    group: number;
    fx?: number | null;
    fy?: number | null;
}

interface Link {
    source: string;
    target: string;
}

interface GraphData {
    nodes: Node[];
    links: Link[];
}

// Helper function to safely get x or y from source/target
const getNodeCoordinate = (
    node: string | Node | undefined,
    coordinate: "x" | "y"
): number => {
    if (typeof node !== "string" && node !== undefined) {
        return node[coordinate] ?? 0;
    }
    return 0;
};

const generateInitialGraphData = (
    nodeCount: number,
    linkCount: number
): GraphData => {
    const nodes: Node[] = [];

    // Generate random nodes
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            id: `Node ${i + 1}`, // Create unique ID for each node
            group: Math.floor(Math.random() * 5) + 1, // Random group between 1 and 5
            x: Math.random() * 800, // Random initial x position
            y: Math.random() * 600, // Random initial y position
        });
    }

    // Generate random links between nodes
    const links: Link[] = [];
    for (let i = 0; i < linkCount; i++) {
        const sourceIndex = Math.floor(Math.random() * nodeCount);
        let targetIndex = Math.floor(Math.random() * nodeCount);

        // Ensure source and target are not the same
        while (targetIndex === sourceIndex) {
            targetIndex = Math.floor(Math.random() * nodeCount);
        }

        links.push({
            source: nodes[sourceIndex].id,
            target: nodes[targetIndex].id,
        });
    }

    return { nodes, links };
};

// Create initial graph data with 20 nodes and 30 links
const initialGraphData = generateInitialGraphData(200, 210);

const textStyle = "font-semibold italic";

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const width = 800;
        const height = 800;

        // Set up SVG
        const svg = select(svgRef.current)
            .attr("viewBox", [0, 0, width, height])
            .attr("width", width)
            .attr("height", height);

        // ** Remove any existing nodes and links **
        svg.selectAll("circle").remove();
        svg.selectAll("line").remove();

        const simulation = forceSimulation<Node>(initialGraphData.nodes)
            .force(
                "link",
                forceLink<Node, Link>()
                    .id((d) => d.id)
                    .links(initialGraphData.links)
                    .distance(300) // Increase link distance to push connected nodes farther apart
            )
            .force("charge", forceManyBody().strength(-200)) // Increase the negative value to make nodes repel each other more strongly
            .force("center", forceCenter(width / 2, height / 2));

        // Create Links
        const link = svg
            .append("g")
            .attr("stroke", "#cbd5e1")
            .attr("stroke-opacity", 0.2)
            .selectAll("line")
            .data(initialGraphData.links)
            .enter()
            .append("line")
            .attr("stroke-width", 1);

        // Create Nodes
        const node = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5)
            .selectAll("circle")
            .data(initialGraphData.nodes)
            .enter()
            .append("circle")
            .attr("r", 10)
            .attr(
                "fill",
                (d) => `#${((d.group * 4321) % 0xffffff).toString(16)}`
            )
            .call(
                d3Drag<SVGCircleElement, Node>()
                    .on("start", (event, d) => {
                        if (!event.active)
                            simulation.alphaTarget(0.1).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                        // Bring the node to the front when dragging starts
                        // select(event.sourceEvent.target).raise();
                    })
                    .on("drag", (event, d) => {
                        d.fx = event.x;
                        d.fy = event.y;
                    })
                    .on("end", (event, d) => {
                        if (!event.active) simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    })
            );

        // Update simulation at every tick
        simulation.on("tick", () => {
            link.attr("x1", (d) => getNodeCoordinate(d.source, "x"))
                .attr("y1", (d) => getNodeCoordinate(d.source, "y"))
                .attr("x2", (d) => getNodeCoordinate(d.target, "x"))
                .attr("y2", (d) => getNodeCoordinate(d.target, "y"));

            node.attr("cx", (d) => d.x ?? 0).attr("cy", (d) => d.y ?? 0);
        });
    }, []);

    return (
        <div
            ref={heroRef}
            id="hero"
            // onClick={(e) => createRipple(e, heroRef)}
            className="relative h-[80vh] flex items-center justify-center bg-white overflow-hidden"
        >
            <svg
                ref={svgRef}
                className="absolute top-0 left-0 w-full h-full"
            ></svg>

            <div className="lg:w-1/2 md:w-3/4 xxs:w-full text-center mx-auto py-8 flex flex-col justify-center items-center xxs:p-[10px] xs:p-2">
                <h1 className="ml-auto mr-auto xs:text-4xl xxs:text-3xl font-bold gradient-text-1 pt-5 pb-5">
                    Hello, I'm Giang
                </h1>
                <p className="text-2xl xxs:text-base xs:text-lg leading-10 mt-10">
                    I'm a full-stack developer with 5 years of experience. I
                    enjoy building{" "}
                    <span className="font-bold italic gradient-text-1">
                        websites & applications,
                    </span>{" "}
                    concentrating primarily on{" "}
                    <span className={`gradient-text-2 ${textStyle}`}>
                        Node.js
                    </span>
                    ,{" "}
                    <span className={`gradient-text-2 ${textStyle}`}>
                        React
                    </span>{" "}
                    and its framework,{" "}
                    <span className={`gradient-text-0 ${textStyle}`}>
                        NextJS.
                    </span>
                </p>

                <Button
                    text="Download CV"
                    onClick={downloadResume}
                    endIcon={<DownloadIcon className="w-6 h-6 text-gray-600" />}
                    className="text-gray-900 font-thin mt-14 w-1/3 xxs:w-3/4 xs:w-[200px] rounded-bl-[60px] rounded-tl-2xl rounded-tr-[50px] rounded-br-xl shadow-lg shadow-slate-600 hover:rounded-tl-[50px] hover:rounded-bl-xl hover:rounded-tr-2xl hover:rounded-br-[60px] hover:bg-white-gradient-conic hover:text-gray-900 hover:border-amber-700 hover:font-normal"
                />

                <Link
                    href="#contact"
                    startIcon={<BuildIcon className="w-6 h-6 text-green-600" />}
                    className="flex items-center justify-center font-thin !text-green-600 !no-underline p-4 border-solid border-2 border-gray-400 rounded-tl-[50px] rounded-bl-xl rounded-tr-2xl rounded-br-[60px] hover:rounded-bl-[60px] hover:rounded-tl-2xl hover:rounded-tr-xl hover:rounded-br-[60px] shadow-lg shadow-slate-600 mt-10 hover:border-amber-700 hover:bg-white-gradient-conic hover:text-sm transform duration-500"
                >
                    Let's build something together
                </Link>
            </div>
        </div>
    );
};

export default Hero;
