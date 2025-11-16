"use client";

import React, { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

const categories = [
  "TOUS",
  "WINGFOIL",
  "WINDPOIL",
  "SURF FOIL",
  "SUP FOIL",
  "DOCKSTART",
  "DOWNWIND",
];

// ✅ Added countries list
const countries = [
  "FRANCE",
  "ALLEMAGNE",
  "UK",
  "ESPAÑA",
  "ETATS-UNIS",
  "POLYNÉSIE FRANÇAISE",
];

const FilterTab = ({ name, isActive, onClick }) => {
  const activeClasses =
    "bg-[#1d98ff] text-white hover:bg-[#1180e0] transition-colors";
  const inactiveClasses =
    "bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors";

  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 font-medium text-sm whitespace-nowrap
        border-none focus:outline-none
        ${isActive ? activeClasses : inactiveClasses}
      `}
    >
      {name}
    </button>
  );
};

const App = () => {
  const [activeTab, setActiveTab] = useState("TOUS");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ Added dropdown open/close state and selected country
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("COUNTRY");

  const countryDropdownClasses = `
    flex items-center justify-between gap-2
    px-5 py-2 font-medium text-sm
    bg-[#1d98ff] text-white
    hover:bg-[#1180e0] transition-colors
    focus:outline-none
  `;

  return (
    <div className="p-4 sm:p-8 h-[80px] bg-white font-sans flex items-center">
      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 w-full p-3 bg-white">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 bg-gray-100 text-gray-700 hover:bg-gray-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="filter-menu"
        >
          <Menu className="w-5 h-5" />
          <span className="ml-2 font-medium text-sm">Filters</span>
        </button>

        {/* Filter Tabs */}
        <div
          id="filter-menu"
          className={`
            w-full lg:w-auto
            flex flex-col lg:flex-row gap-2
            transition-all duration-300 ease-in-out
            ${isMobileMenuOpen
              ? "max-h-96 opacity-100"
              : "max-h-0 lg:max-h-full opacity-0 lg:opacity-100 overflow-hidden"}
          `}
        >
          {categories.map((category) => (
            <FilterTab
              key={category}
              name={category}
              isActive={activeTab === category}
              onClick={() => setActiveTab(category)}
            />
          ))}
        </div>

        {/* ✅ Country Dropdown */}
{/* ✅ Country Dropdown */}
<div className="relative mt-2 lg:mt-0 w-[200px]"> {/* fix width to match dropdown */}
  <button
    className={`
      w-full flex items-center justify-between gap-2
      px-5 py-2 font-medium text-sm
      bg-[#1d98ff] text-white
      hover:bg-[#1180e0] transition-colors
      focus:outline-none
    `}
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
  >
    {selectedCountry}
    <ChevronDown
      className={`w-4 h-4 transition-transform ${
        isDropdownOpen ? "rotate-180" : "rotate-0"
      }`}
    />
  </button>

  {isDropdownOpen && (
    <div className="absolute left-0 w-full bg-[#1d98ff] text-white shadow-lg z-10 mt-1">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => {
            setSelectedCountry(country);
            setIsDropdownOpen(false);
          }}
          className="w-full text-left px-5 py-2 text-sm hover:bg-white hover:text-[#1d98ff] transition-colors"
        >
          {country}
        </button>
      ))}
    </div>
  )}
</div>

      </div>
    </div>
  );
};

export default App;
