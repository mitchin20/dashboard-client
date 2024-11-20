import { memo, useEffect } from "react";
import {
    drag as d3Drag,
    forceCenter,
    forceLink,
    forceManyBody,
    forceSimulation,
    forceX,
    forceY,
    select,
    SimulationLinkDatum,
    SimulationNodeDatum,
} from "d3";

interface TemporalForceGraphProps {
    containerRef: React.RefObject<SVGSVGElement>;
}

interface Node extends SimulationNodeDatum {
    id: string;
    group: number;
    fx?: number | null;
    fy?: number | null;
}

interface Link extends SimulationLinkDatum<Node> {
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

// Function to generate initial graph data
const generateInitialGraphData = (
    nodeCount: number,
    linkCount: number
): { nodes: Node[]; links: Link[] } => {
    const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => ({
        id: `Node ${i + 1}`,
        group: Math.floor(Math.random() * 5) + 1,
        x: Math.random() * 800,
        y: Math.random() * 600,
    }));

    const links: Link[] = Array.from({ length: linkCount }, () => {
        const sourceIndex = Math.floor(Math.random() * nodeCount);
        let targetIndex = Math.floor(Math.random() * nodeCount);
        while (targetIndex === sourceIndex) {
            targetIndex = Math.floor(Math.random() * nodeCount);
        }
        return {
            source: nodes[sourceIndex].id,
            target: nodes[targetIndex].id,
        };
    });

    return { nodes, links };
};

// Create initial graph data with 20 nodes and 30 links
const initialData: GraphData = generateInitialGraphData(200, 250);
const width: number = 800;
const height: number = 800;

const TemporalForceGraph: React.FC<TemporalForceGraphProps> = ({
    containerRef,
}) => {
    useEffect(() => {
        if (!containerRef.current) return;

        // Copy nodes and links from the initial dataset
        let nodes: Node[] = [...initialData.nodes];
        let links: Link[] = [...initialData.links];

        // Select the SVG element and configure it
        const svg = select<SVGSVGElement, unknown>(containerRef.current!)
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("width", width)
            .attr("height", height);

        // Create groups for links and nodes
        const linkGroup = svg
            .append("g")
            .attr("stroke", "#cbd5e1")
            .attr("stroke-opacity", 0.2);
        const nodeGroup = svg
            .append("g")
            .attr("stroke", "#fff")
            .attr("stroke-width", 1.5);

        // Initialize the force simulation
        const simulation = forceSimulation<Node>(nodes)
            .force(
                "link",
                forceLink<Node, Link>()
                    .id((d: Node) => d.id)
                    .distance(200)
                    .links(links)
            )
            .force("charge", forceManyBody().strength(-1000))
            .force("center", forceCenter(width / 2, height / 2).strength(0.1))
            .force("x", forceX(width / 2).strength(0.1)) // Boundary force for x
            .force("y", forceY(height / 2).strength(0.1)); // Boundary force for y

        simulation.on("tick", () => {
            linkGroup
                .selectAll<SVGLineElement, Link>("line")
                .data(links, (d) => `${d.source}-${d.target}`)
                .join(
                    (enter) => enter.append("line").attr("stroke-width", 1),
                    (update) => update,
                    (exit) => exit.remove()
                )
                .attr("x1", (d) => getNodeCoordinate(d.source, "x"))
                .attr("y1", (d) => getNodeCoordinate(d.source, "y"))
                .attr("x2", (d) => getNodeCoordinate(d.target, "x"))
                .attr("y2", (d) => getNodeCoordinate(d.target, "y"));

            nodeGroup
                .selectAll<SVGCircleElement, Node>("circle")
                .data(nodes, (d) => d.id)
                .join(
                    (enter) =>
                        enter
                            .append("circle")
                            .attr("r", 3)
                            .attr(
                                "fill",
                                (d) =>
                                    `#${((d.group * 4321) % 0xffffff).toString(16)}`
                            )
                            .call(
                                d3Drag<SVGCircleElement, Node>()
                                    .on("start", (event, d) => {
                                        if (!event.active)
                                            simulation
                                                .alphaTarget(0.1)
                                                .restart();
                                        d.fx = d.x;
                                        d.fy = d.y;
                                    })
                                    .on("drag", (event, d) => {
                                        d.fx = event.x;
                                        d.fy = event.y;
                                    })
                                    .on("end", (event, d) => {
                                        if (!event.active)
                                            simulation.alphaTarget(0);
                                        d.fx = null;
                                        d.fy = null;
                                    })
                            ),
                    (update) => update,
                    (exit) => exit.remove()
                )
                .attr("cx", (d) => d.x ?? 0)
                .attr("cy", (d) => d.y ?? 0);
        });

        // Periodically add new nodes and links
        const interval = setInterval(() => {
            const newNode: Node = {
                id: `Node ${nodes.length + 1}`,
                group: Math.floor(Math.random() * 5) + 1,
                x: Math.random() * width,
                y: Math.random() * height,
            };
            nodes.push(newNode);

            if (nodes.length > 1) {
                const randomSource =
                    nodes[Math.floor(Math.random() * nodes.length)];
                const randomTarget =
                    nodes[Math.floor(Math.random() * nodes.length)];
                if (randomSource.id !== randomTarget.id) {
                    links.push({
                        source: randomSource.id, // Use the string ID
                        target: randomTarget.id, // Use the string ID
                    });
                }
            }

            // Trim nodes and links for performance
            if (nodes.length > 300) nodes.shift();
            if (links.length > 400) links.shift();

            // Update the simulation with new data
            simulation.nodes(nodes);
            simulation.force(
                "link",
                forceLink<Node, Link>()
                    .id((d: Node) => d.id)
                    .links(links)
            );
            simulation.alphaTarget(0.008).restart();
        }, 1000); // Add new node/link every second

        return () => {
            clearInterval(interval);
            simulation.stop();
        };
    }, []);

    return (
        <svg
            ref={containerRef}
            className="absolute top-0 left-0 w-full h-full"
        ></svg>
    );
};

export default memo(TemporalForceGraph);
