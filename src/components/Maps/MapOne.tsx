"use client";
import jsVectorMap from "jsvectormap";
import "jsvectormap/dist/css/jsvectormap.css";
import React, { useEffect } from "react";
import "../../js/us-aea-en";

const MapOne: React.FC = () => {
  useEffect(() => {
    // Define the mock data for states
    type StateData = {
      [key: string]: { attack: number };
    };

    const stateData: StateData = {
      "US-TX": { attack: 93 },
      "US-CA": { attack: 85 },
      "US-NY": { attack: 78 },
      // Add more state data as needed
    };

    const mapOne = new jsVectorMap({
      selector: "#mapOne",
      map: "us_aea_en",
      zoomButtons: true,

      regionStyle: {
        initial: {
          fill: "#C8D0D8",
        },
        hover: {
          fillOpacity: 1,
          fill: "#FF0000", // Red color on hover
        },
      },
      regionLabelStyle: {
        initial: {
          fontFamily: "Satoshi",
          fontWeight: "semibold",
          fill: "#fff",
        },
        hover: {
          cursor: "pointer",
        },
      },

      labels: {
        regions: {
          render(code: string) {
            const state = stateData[code];
            return state ? `Attack: ${state.attack}` : code.split("-")[1];
          },
        },
      },
    });

    return () => {
      mapOne.destroy();
    };
  }, []);

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
      <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
        Region labels
      </h4>
      <div className="h-90">
        <div id="mapOne" className="mapOne map-btn"></div>
      </div>
    </div>
  );
};

export default MapOne;
