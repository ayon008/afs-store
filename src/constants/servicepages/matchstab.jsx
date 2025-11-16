// This code is written for a Next.js environment using a standard React functional component
// and styled with Tailwind CSS.

import React, { useState } from 'react';

const BestMatchStab = () => {
  // State to hold the user's selections
  const [frontWing, setFrontWing] = useState('');
  const [practice, setPractice] = useState('Accessibility');

  // --- Dropdown Options Data ---
  const frontWingOptions = [
    { label: 'Pure Range', options: ['Pure 700', 'Pure 900', 'Pure HA800', 'Pure HA1100'] },
    { label: 'Skill Range', options: ['Silk 650', 'Silk 850', 'Silk 1050'] },
    { label: 'Evo Range', options: ['Evo 950', 'Evo 1250', 'Evo 1450', 'Evo 1650', 'Evo HA750'] },
  ];

  const practiceOptions = [
    'Accessibility', // Default shown in the image, but added to the list
    'Jump',
    'Glider',
    'Pumper',
    'Speed',
    'Lift',
  ];
  // -----------------------------

  const handleGenerate = (e) => {
    e.preventDefault();
    // In a real application, you'd handle the form submission here, e.g.,
    // call an API to get the matching stabilizer.
    console.log('Generating podium with:', { frontWing, practice });
    alert(`Generating match for:\nFront Wing: ${frontWing || 'Not Selected'}\nPractice: ${practice}`);
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-start pt-20">
      <div className="w-full max-w-md p-6 sm:p-8">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-16 sm:mb-20 tracking-tight">
          Best match stab
        </h1>

        <form onSubmit={handleGenerate} className="space-y-10">
          {/* Front Wing Selection */}
          <div>
            <label htmlFor="frontWing" className="text-xl font-semibold text-gray-900 mb-3 block">
              Choose your front wing:
            </label>
            <div className="relative">
              <select
                id="frontWing"
                value={frontWing}
                onChange={(e) => setFrontWing(e.target.value)}
                required
                className="
                  block w-full px-4 py-3 text-base text-gray-700
                  border border-gray-400 rounded-md shadow-sm
                  focus:outline-none focus:ring-0 focus:border-black
                  appearance-none cursor-pointer
                "
              >
                {/* Default/Placeholder Option */}
                <option value="" disabled>
                  — Choose your front wing —
                </option>

                {/* Grouped Options */}
                {frontWingOptions.map((group) => (
                  <optgroup key={group.label} label={group.label} className="font-semibold text-gray-900">
                    {group.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {/* Custom Chevron/Arrow (Optional, helps match design) */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.27a.75.75 0 010-1.06z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Practice Selection */}
          <div>
            <label htmlFor="practice" className="text-xl font-semibold text-gray-900 mb-3 block">
              Choose your practice:
            </label>
            <div className="relative">
              <select
                id="practice"
                value={practice}
                onChange={(e) => setPractice(e.target.value)}
                required
                className="
                  block w-full px-4 py-3 text-base text-gray-700
                  border border-gray-400 rounded-md shadow-sm
                  focus:outline-none focus:ring-0 focus:border-black
                  appearance-none cursor-pointer
                "
              >
                {practiceOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
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

          {/* Button */}
          <button
            type="submit"
            className="
              w-full py-4 bg-black text-white text-lg font-semibold
              rounded-md shadow-lg
              hover:bg-gray-800 transition duration-150 ease-in-out
              tracking-wide mt-10
            "
          >
            Generate podium
          </button>
        </form>
      </div>
    </div>
  );
};

export default BestMatchStab;