import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import "./India.css";


const stateInfo = {
  "Andhra Pradesh": {
    waste: "500 tons/day",
    recycling: "300 tons/day",
  },
  "Karnataka": {
    waste: "400 tons/day",
    recycling: "250 tons/day",
  },
  "Telangana": {
    waste: "400 tons/day",
    recycling: "200 tons/day",
  },
  // Add other states as needed
};


const IndiaMap = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    d3.select("#india-map").selectAll("*").remove();
    const width = 1200;
    const height = 800;

    // Create SVG container
    const svg = d3
      .select("#india-map")
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("background", "#f5f5f5")
      .style("border-radius", "8px");

    // Define projection
    const projection = d3
      .geoMercator()
      .scale(1000)
      .center([78, 22]) // Centered on India
      .translate([width / 2, height / 2]);

    // Set zoom functionality
    const zoom = d3.zoom().scaleExtent([1, 8]).on("zoom", (event) => {
      svg.selectAll("path").attr("transform", event.transform);
    });

    svg.call(zoom);

    // Load the India state data (indiastate.geojson)
    setLoading(true);
    d3.json("/indiastate.geojson")
      .then((geoData) => {
        // Define the path generator for drawing the state borders
        const path = d3.geoPath().projection(projection);

        // Draw the state shapes
        svg
          .selectAll("path")
          .data(geoData.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", "#b3d9ff")
          .attr("stroke", "#333")
          .attr("stroke-width", 0.5)
          .on("mouseover", function (event, d) {
            d3.select(this).attr("fill", "#66b3ff");
          })
          .on("mouseout", function (event, d) {
            d3.select(this).attr("fill", "#b3d9ff");
          })
          .on("click", function (event, d) {
            const stateName = d.properties.NAME_1; // Adjust this key if needed
            setSelectedState(stateName);
            // Highlight the clicked state
            svg
              .selectAll("path")
              .attr("fill", "#b3d9ff"); // Reset color for all states
            d3.select(this).attr("fill", "#ff6b6b"); // Highlight the clicked state
          });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setError(err.message);
        setLoading(false);
      });

    return () => {
      svg.selectAll("*").remove(); // Clean up on component unmount
    };
  }, []);

  return (
    <div className="map-container">
      {loading && <div className="loading">Loading map data...</div>}
      {error && <div className="error">Error: {error}</div>}
      <div id="india-map" style={{ width: "100%", height: "500px" }}></div>
      {selectedState && (
        <div className="state-info">
          <h3>{selectedState}</h3>
          <p>
            <strong>Waste Generation:</strong> Data for {selectedState} here
          </p>
          <p>
            <strong>Waste Recycling:</strong> Data for {selectedState} here
          </p>
        </div>
      )}
      <div className="map-notes">
        <p>Click on any state to view details</p>
      </div>
    </div>
  );
};

export default IndiaMap;
