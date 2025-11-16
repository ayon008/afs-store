// This code is written for a Next.js environment using a standard React functional component
// and styled with Tailwind CSS.

import React, { useState } from 'react';

const WingStabComparison = () => {
  // State for the single-select front wing
  const [frontWing, setFrontWing] = useState('');
  // State for the multi-select stabilizers (an array of selected values)
  const [selectedStabs, setSelectedStabs] = useState([]);

  // --- Options Data ---
  const frontWingOptions = [
    'Pure 700', 'Pure 900', 'Pure HA800', 'Pure HA1100',
    'Silk 650', 'Silk 850', 'Silk 1050',
    'Evo 950', 'Evo 1250', 'Evo 1450', 'Evo 1650', 'Evo HA750',
  ];

  const stabOptions = [
    { label: 'Cruiser range', options: ['Cruiser 190', 'Cruiser 220', 'Cruiser 245'] },
    { label: 'Pure range', options: ['Pure 145', 'Pure 160', 'Pure 185'] },
    { label: 'Performance range', options: ['Silk 100', 'Silk 120', 'Silk 140'] },
    // Adding more options to make the scrollbar visible as in the image
    { label: 'Evo range', options: ['Evo 80', 'Evo 100', 'Evo 120', 'Evo 140'] },
    { label: 'HA range', options: ['HA 65', 'HA 75', 'HA 85', 'HA 95'] },
  ];
  // -----------------------------

  // Handler for the multi-select listbox
  const handleStabSelect = (e) => {
    // Note: The HTML <select multiple> sends all selected options on change.
    const newSelections = Array.from(e.target.selectedOptions, (option) => option.value);

    // Limit selection to 3
    if (newSelections.length <= 3) {
      setSelectedStabs(newSelections);
    } else {
      // Optional: Give feedback that the limit is reached
      alert('You can only select up to 3 stabilizers for comparison.');
      // Revert to the last valid selection (which is the first 3 items)
      setSelectedStabs(newSelections.slice(0, 3));
    }
  };

  const handleCalculate = () => {
    console.log('Comparison Request:', { frontWing, selectedStabs });
    alert(`Starting comparison for:\nFront Wing: ${frontWing || 'Not Selected'}\nStabs: ${selectedStabs.join(', ')}`);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-start pt-20 px-4">
      <div className="w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-10 sm:mb-16 tracking-tight">
          Select your front wing and 3 stabs for comparison
        </h1>

        {/* Front Wing Section */}
        <div className="mb-10">
          <label htmlFor="frontWingSelect" className="text-xl font-bold text-gray-900 mb-3 block">
            Front wing
          </label>
          <div className="relative">
            <select
              id="frontWingSelect"
              value={frontWing}
              onChange={(e) => setFrontWing(e.target.value)}
              className="
                block w-full px-4 py-3 text-base text-gray-700
                border border-gray-400 rounded-sm shadow-sm
                focus:outline-none focus:ring-0 focus:border-black
                appearance-none cursor-pointer h-12
              "
            >
              <option value="" disabled>
                — Select a front wing —
              </option>
              {frontWingOptions.map((wing) => (
                <option key={wing} value={wing}>
                  {wing}
                </option>
              ))}
            </select>
            {/* Custom Chevron/Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        {/* Stabilizers Section */}
        <div className="mb-10">
          <label htmlFor="stabSelect" className="text-xl font-bold text-gray-900 mb-3 block">
            Stabilizers (up to 3)
          </label>
          <p className="text-sm text-gray-600 mb-2">
            You can hold down the **Ctrl Key** (or **Cmd** on Mac) to select/deselect options.
          </p>
          <div className="relative border border-gray-400 rounded-sm overflow-hidden">
            <select
              id="stabSelect"
              multiple
              value={selectedStabs}
              onChange={handleStabSelect}
              className="
                block w-full text-base text-gray-800
                focus:outline-none focus:ring-0 focus:border-black
                min-h-[250px] max-h-[300px] overflow-y-auto
              "
              // Custom style to match the listbox height and text alignment from the image
              style={{ padding: '0px', lineHeight: '1.5rem' }}
            >
              {stabOptions.map((group) => (
                <optgroup
                  key={group.label}
                  label={group.label}
                  className="font-bold text-gray-900 bg-gray-50 p-1"
                >
                  {group.options.map((stab) => (
                    <option
                      key={stab}
                      value={stab}
                      className="p-1 cursor-pointer hover:bg-gray-200"
                    >
                      {stab}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        {/* Calculate Button */}
        <button
          type="button"
          onClick={handleCalculate}
          className="
            px-4 py-2 border border-black text-sm font-medium
            text-black bg-white rounded-sm shadow-sm
            hover:bg-gray-100 transition duration-150 ease-in-out
          "
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default WingStabComparison;