import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { Map as LeafletMap, Layer, GeoJSON as LeafletGeoJSON } from "leaflet";
import { Feature, Geometry, MultiPolygon, Polygon } from "geojson";
import "leaflet/dist/leaflet.css";

interface CountyGeoGraphProps {
    fips: string; // FIPS code to select the county
    height?: string;
}

// Define types for GeoJSON properties
interface CountyProperties {
    GEOID: string; // FIPS code
    name: string; // County name
}

interface GeoJSONData {
    type: "FeatureCollection";
    features: Feature<Geometry, CountyProperties>[];
}

const CountyGeoGraph: React.FC<CountyGeoGraphProps> = ({
    fips,
    height = "500px",
}) => {
    const [geoData, setGeoData] = useState<GeoJSONData | null>(null); // State for GeoJSON data

    const mapRef = useRef<LeafletMap | null>(null); // Reference to the Leaflet map instance
    const geoJsonRef = useRef<LeafletGeoJSON | null>(null); // Reference to the GeoJSON instance

    // Fetch GeoJSON data
    useEffect(() => {
        fetch("/geojson/counties.geojson")
            .then((response) => response.json())
            .then((data: GeoJSONData) => setGeoData(data))
            .catch((error) => console.error("Error loading GeoJSON:", error));
    }, []);

    // Focus on the selected county and update the center
    useEffect(() => {
        if (!geoData || !mapRef.current) return;

        // Find the selected county by FIPS
        const selectedCounty = geoData.features.find(
            (feature) => feature.properties.GEOID === fips
        );

        if (selectedCounty) {
            const { geometry } = selectedCounty;

            // Calculate the bounding box (bounds) of the selected county
            if (geometry.type === "Polygon") {
                const bounds = (geometry as Polygon).coordinates[0].map(
                    ([lng, lat]) => [lat, lng] as [number, number]
                );
                mapRef.current.fitBounds(bounds);
            } else if (geometry.type === "MultiPolygon") {
                // Flatten the multi-polygon coordinates and calculate bounds
                const bounds = (geometry as MultiPolygon).coordinates
                    .flat(2) // Flatten all coordinates into one array
                    .map(([lng, lat]) => [lat, lng] as [number, number]);
                mapRef.current.fitBounds(bounds);
            }
        }
    }, [geoData, fips]);

    // Update county highlight when fips changes
    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.eachLayer((layer: Layer) => {
                const pathLayer = layer as L.Path; // Cast the layer to L.Path to access setStyle
                const feature = (layer as any).feature as Feature<
                    Geometry,
                    CountyProperties
                >;
                if (feature.properties.GEOID === fips) {
                    pathLayer.setStyle({ fillColor: "red", weight: 2 });
                } else {
                    pathLayer.setStyle({ fillColor: "gray", weight: 1 });
                }
            });
        }
    }, [fips]);

    // Highlight the selected county
    const onEachFeature = (
        feature: Feature<Geometry, CountyProperties>,
        layer: Layer
    ) => {
        const pathLayer = layer as L.Path; // Cast the layer to L.Path to access setStyle
        if (feature.properties.GEOID === fips) {
            pathLayer.setStyle({ fillColor: "red", weight: 2 });
        } else {
            pathLayer.setStyle({ fillColor: "gray", weight: 1 });
        }
    };

    return (
        <MapContainer
            ref={mapRef}
            zoom={8} // Default zoom
            style={{
                height: height,
                width: "100%",
                borderRadius: "10px",
                marginBottom: "20px",
            }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {geoData && (
                <GeoJSON
                    ref={geoJsonRef}
                    data={geoData}
                    onEachFeature={onEachFeature}
                />
            )}
        </MapContainer>
    );
};

export default CountyGeoGraph;
