"use client";

import React, { useState } from "react";
import Content from "./content"; // Import from local directory

export default function DetailsPage() {
  const tabs = [
    { name: "ALL", count: 20 },
    { name: "FOIL", count: 13 },
    { name: "BOARD", count: 1 },
    { name: "PREVIOUS RANGE", count: 6 },
  ];

  const [activeTab, setActiveTab] = useState("FOIL");

  return (
    <section className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="w-full pt-20 pb-16 px-6 sm:px-8 lg:px-10">

        {/* --- Main Heading --- */}
        <header className="mb-16">
          <h1
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "70px",
              fontWeight: 700,
              lineHeight: "70px",
              color: "rgb(17, 17, 17)",
            }}
            className="tracking-tight"
          >
            Details and
            <br />
            dimensions Foils /
            <br />
            Boards
          </h1>
        </header>

        {/* --- Tabs Navigation --- */}
        <div className="border-b border-black"> {/* Thinner black line */}
          <nav className="flex space-x-10 ml-0" aria-label="Tabs">
            {tabs.map((tab) => {
              const isActive = tab.name === activeTab;
              return (
                <button
                  key={tab.name}
                  onClick={() => setActiveTab(tab.name)}
                  style={{
                    fontFamily: '"alliance no.2", sans-serif, serif',
                    fontSize: "16px",
                    fontWeight: 500,
                    lineHeight: "16px",
                    color: isActive
                      ? "rgb(23, 89, 143)" // Active text color
                      : "rgba(17, 17, 17, 0.7)",
                  }}
                  className={`py-4 px-1 inline-flex items-center uppercase transition-colors duration-300`}
                >
                  <span>
                    {tab.name} ({tab.count})
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* --- Tab Content --- */}
        <div className="mt-8 w-full">
          <div className="w-full overflow-hidden">
            <Content filter={activeTab} />
          </div>
        </div>
      </div>
    </section>
  );
}
