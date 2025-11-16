"use client";

import React, { useState } from "react";

export default function NavigationStack() {
  // List of disciplines
  const disciplines = [
    "ALL",
    "WINGFOIL",
    "WINDFOIL",
    "SURF FOIL",
    "SUP FOIL",
    "DOCKSTART",
    "DOWNWIND",
  ];

  // Active filter state
  const [activeDiscipline, setActiveDiscipline] = useState("ALL");
  // Selected country state
  const [selectedCountry, setSelectedCountry] = useState("");

  // Dropdown options
  const countryOptions = [
    "United States",
    "Australia",
    "France",
    "Brazil",
    "Germany",
  ];

  // Inline SVG icon for dropdown arrow
  const ChevronDown = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 ml-1"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <div className="min-h-[200px] bg-gray-50 p-4 md:p-8 font-inter">
      {/* Filter Bar Container */}
      <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto bg-white p-4 rounded-xl shadow-lg space-y-4 md:space-y-0 md:space-x-4">
        {/* Discipline Filter Tabs */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          {disciplines.map((discipline) => {
            const isActive = activeDiscipline === discipline;
            return (
              <button
                key={discipline}
                onClick={() => setActiveDiscipline(discipline)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out shadow-md whitespace-nowrap ${
                  isActive
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                aria-pressed={isActive}
              >
                {discipline}
              </button>
            );
          })}
        </div>

        {/* Country Dropdown */}
        <div className="relative w-full md:w-auto min-w-[160px]">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="appearance-none w-full md:w-auto py-2 pl-4 pr-10 rounded-lg font-medium cursor-pointer bg-blue-500 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Select Country"
          >
            <option value="" disabled hidden>
              COUNTRY
            </option>
            {countryOptions.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Custom Dropdown Arrow */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-white">
            <ChevronDown />
          </div>
        </div>
      </div>
    </div>
  );
}
