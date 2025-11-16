"use client";

import { useState } from "react";

const categories = [
  { id: 2391, label: "Accessoires" },
  {
    id: 2401,
    label: "Foil board",
    children: [
      { id: 2402, label: "Beginner foil board" },
      { id: 2403, label: "Intermediate foil board" },
      { id: 2404, label: "Pro foil board" },
    ],
  },
  {
    id: 2393,
    label: "Foil full set",
    children: [
      { id: 2394, label: "Beginner foil full set" },
      { id: 2395, label: "Intermediate foil full set" },
      { id: 2396, label: "Pro foil full set" },
    ],
  },
  { id: 2392, label: "Front wing" },
  { id: 2397, label: "Fuselage" },
  { id: 2398, label: "Mast" },
  { id: 2399, label: "Occasion" },
  { id: 2400, label: "Package" },
  { id: 2406, label: "Stabilizer" },
  { id: 2405, label: "Used" },
  { id: 2407, label: "Wing" },
];

export default function CategoriesFilter({ onChange, onPriceChange, className = "" }) {
  const [selected, setSelected] = useState([]);
  const [minValue, setMinValue] = useState(200);
  const [maxValue, setMaxValue] = useState(800);

  const toggleCategory = (id) => {
    setSelected((prev) => {
      const newSelected = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      if (onChange) onChange(newSelected);
      return newSelected;
    });
  };

  const renderCategory = (cat) => (
    <div key={cat.id} className={`${cat.children ? "ml-4" : ""} py-1`}>
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          className="form-checkbox h-4 w-4 text-blue-600"
          value={cat.id}
          checked={selected.includes(cat.id)}
          onChange={() => toggleCategory(cat.id)}
        />
        <span
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "16px",
            color: "rgb(153, 153, 153)",
          }}
        >
          {cat.label}
        </span>
      </label>

      {cat.children && <div className="ml-4">{cat.children.map(renderCategory)}</div>}
    </div>
  );

  return (
    <nav className={`bg-white rounded-xl shadow-md border border-gray-100 p-6 w-full sm:w-[340px] lg:w-[280px] min-h-fit overflow-hidden ${className}`}>
      <div
        className="categories-container"
        style={{
          maxHeight: "600px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#ccc #f5f5f5",
          margin: 0,
        }}
      >
        {/* Heading */}
        <h3 className="mb-6 uppercase tracking-wider text-black font-bold" style={{fontFamily: '"Alliance No.2", sans-serif', fontSize: '18px', lineHeight: '20px'}}>
          Categories
        </h3>

      {/* Category List */}
      <div>{categories.map(renderCategory)}</div>

        {/* Price Range Section */}
        <div className="mt-8">
        <h3
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "16px",
            color: "rgb(0, 0, 0)",
            marginBottom: "10px",
          }}
        >
          PRICE RANGE
        </h3>

  <div className="relative w-full flex flex-col items-start">
          <div className="relative w-full mt-3">
            {/* Dashed Track */}
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-[6px] bg-transparent dashed-track"></div>

            {/* Two range sliders (aligned properly) */}
            <input
              type="range"
              min="0"
              max="1000"
              value={minValue}
              onChange={(e) =>
                setMinValue(Math.min(Number(e.target.value), maxValue - 10))
              }
              className="dual-range absolute top-1/2 -translate-y-1/2 w-full pointer-events-none"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={maxValue}
              onChange={(e) =>
                setMaxValue(Math.max(Number(e.target.value), minValue + 10))
              }
              className="dual-range absolute top-1/2 -translate-y-1/2 w-full pointer-events-none"
            />
          </div>

          {/* Values Display */}
          <div className="flex justify-between w-full mt-4">
            <span
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "14px",
                color: "rgb(153, 153, 153)",
              }}
            >
              ${minValue}
            </span>
            <span
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "14px",
                color: "rgb(153, 153, 153)",
              }}
            >
              ${maxValue}
            </span>
          </div>
        </div>
      </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              if (onPriceChange) onPriceChange({ min: minValue > 0 ? minValue : null, max: maxValue < 10000 ? maxValue : null });
            }}
            className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            style={{ fontFamily: '"Alliance No.2", sans-serif', fontSize: '14px', fontWeight: 600 }}
          >
            Apply
          </button>

          <button
            onClick={() => {
              setMinValue(200);
              setMaxValue(800);
              if (onPriceChange) onPriceChange({ min: null, max: null });
            }}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            style={{ fontFamily: '"Alliance No.2", sans-serif', fontSize: '14px', fontWeight: 600 }}
          >
            Clear
          </button>
        </div>

        {/* Styles */}
        <style jsx>{`
        /* Scrollbar */
        .categories-container::-webkit-scrollbar {
          width: 6px;
        }
        .categories-container::-webkit-scrollbar-thumb {
          background-color: #c1c1c1;
          border-radius: 6px;
        }
        .categories-container::-webkit-scrollbar-thumb:hover {
          background-color: #a1a1a1;
        }
        .categories-container::-webkit-scrollbar-track {
          background-color: #f5f5f5;
        }

        /* Dashed line (13 dashes) */
        .dashed-track {
          display: grid;
          grid-template-columns: repeat(13, 1fr);
          gap: 6px;
          position: relative;
        }
        .dashed-track::before {
          content: "";
          grid-column: 1 / -1;
          height: 2px;
          display: block;
          background-image: repeating-linear-gradient(
            to right,
            #999 0,
            #999 calc((100% / 13) - 6px),
            transparent calc((100% / 13) - 6px),
            transparent calc(100% / 13)
          );
        }

        /* Dual range handles aligned with dashes */
        .dual-range {
          appearance: none;
          height: 6px;
          background: transparent;
          pointer-events: all;
        }

        .dual-range::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background-color: #000;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          margin-top: -5px; /* aligns perfectly with dashed line */
        }

        .dual-range::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background-color: #000;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.4);
          cursor: pointer;
        }
      `}</style>
      </div>
    </nav>
  );
}
