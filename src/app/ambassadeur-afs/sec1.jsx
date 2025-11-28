"use client";

import React, { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";

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
    "bg-[#F2F2F2] text-[#c3c3c3] hover:bg-gray-200 transition-colors";

  return (
    <button
      onClick={onClick}
      className={`
        px-5 py-3 rounded-[5px] cursor-pointer font-bold text-[15px] leading-[19px] whitespace-nowrap
        border-none focus:outline-none
        ${isActive ? activeClasses : inactiveClasses}
      `}
    >
      {name}
    </button>
  );
};

const App = ({ categories, activeTab, setActiveTab }) => {
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
    <div className="h-[80px] bg-white font-sans flex items-center">
      {/* Filter Bar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3 w-full bg-white">
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
          <FilterTab
            key={1}
            name={"TOUS"}
            isActive={activeTab === 1}
            onClick={() => setActiveTab(1)}
          />
          {categories.map((category) => (
            <FilterTab
              key={category.id}
              name={category.name}
              isActive={activeTab === category.id}
              onClick={() => setActiveTab(category.id)}
            />
          ))}
        </div>

        {/* ✅ Country Dropdown */}
        {/* ✅ Country Dropdown */}
        <div className="relative mt-2 lg:mt-0 w-[220px] rounded-[4px] bg-[#1d98ff] cursor-pointer"> {/* fix width to match dropdown */}
          <button
            className={`
      w-full flex items-center justify-between gap-2
      p-[10px] font-bold text-[15px] leading-[20px]
      bg-[#1d98ff] text-white
      hover:bg-[#1180e0] transition-colors
      focus:outline-none rounded-[4px]
    `}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {selectedCountry}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 w-full bg-[#1d98ff] text-white shadow-lg z-10 rounded-b-[4px] -mt-1">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setIsDropdownOpen(false);
                  }}
                  className="w-full text-left p-[10px]  font-bold text-[15px] leading-[20px] hover:bg-white hover:text-[#1d98ff] transition-colors"
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
