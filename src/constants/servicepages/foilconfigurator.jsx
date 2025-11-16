// This code is written for a Next.js environment, using a standard React functional component
// and styled with Tailwind CSS for a modern and clean implementation.

import React, { useState } from 'react';

// For simplicity, I'm using placeholder image paths.
// Replace these with actual paths to your images or use icons/SVGs.
const icons = {
  sup: '/images/sup-foil-icon.png',
  wing: '/images/wing-foil-icon.png',
  surf: '/images/surf-foil-icon.png',
  downwind: '/images/downwind-icon.png',
  dockstart: '/images/dockstart-icon.png',
  wake: '/images/wake-foil-icon.png',
  wind: '/images/wind-foil-icon.png',
};

const FoilConfigurator = () => {
  // State for form controls (though not strictly needed to just clone the visual)
  const [weight, setWeight] = useState(70);
  const [level, setLevel] = useState('');
  const [practical, setPractical] = useState('');

  // The levels are defined as an array for easy mapping
  const levels = [
    { value: 'complete_beginner', label: 'Complete beginner' },
    { value: 'first_flights', label: 'First flights' },
    { value: 'autonomous', label: 'Autonomous (I know how to go upwind)' },
    { value: 'good_rider', label: 'Good rider' },
    { value: 'pro', label: 'Pro' },
  ];

  // The practical options are defined as an array for easy mapping
  const practicalOptions = [
    { value: 'sup', label: 'Sup Foil', icon: icons.sup },
    { value: 'wing', label: 'Wing Foil', icon: icons.wing },
    { value: 'surf', label: 'Surf Foil', icon: icons.surf },
    { value: 'downwind', label: 'Downwind', icon: icons.downwind },
    { value: 'dockstart', label: 'Dockstart', icon: icons.dockstart },
    { value: 'wake', label: 'Wakefoil', icon: icons.wake },
    { value: 'wind', label: 'Windfoil', icon: icons.wind },
  ];

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 flex justify-center items-start pt-10">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-normal text-center mb-10">Foil configurator</h1>

        {/* Practical Section */}
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-4">Practical :</h2>
          <div className="space-y-3 pl-2">
            {practicalOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3 cursor-pointer"
                   onClick={() => setPractical(option.value)}>
                {/* Placeholder for the image/icon. Adjust 'w-6 h-6' for size. */}
                <img
                  src={option.icon}
                  alt={`${option.label} icon`}
                  className="w-6 h-6 object-contain"
                  // Using an invisible dummy div to reserve space if the image fails to load
                  onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.prepend(document.createElement('div', { className: 'w-6 h-6 bg-gray-200' })) }}
                />
                <span className={`text-base ${practical === option.value ? 'font-medium text-blue-600' : 'text-gray-800'}`}>
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weight Section */}
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-4">Weight of the practitioner:</h2>
          <div className="pl-2">
            {/* Display weight value */}
            <p className="mb-2 text-gray-700">{weight} kg</p>
            {/* Custom styled range input to mimic the image's appearance */}
            <input
              type="range"
              min="30"
              max="120"
              value={weight}
              onChange={(e) => setWeight(parseInt(e.target.value))}
              className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              style={{
                // Custom styles for the thumb (the dot) to make it look like the image
                '--tw-ring-color': 'rgb(59 130 246 / var(--tw-ring-opacity))', // Blue-600
                '--tw-ring-opacity': '1',
              }}
            />
          </div>
        </div>

        {/* Level Section */}
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-4">Level :</h2>
          <div className="space-y-2 pl-2">
            {levels.map((option) => (
              <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                {/* Custom radio button to match the simple circular style */}
                <input
                  type="radio"
                  name="level"
                  value={option.value}
                  checked={level === option.value}
                  onChange={() => setLevel(option.value)}
                  className="
                    h-4 w-4 text-black border-gray-300 focus:ring-0
                    checked:bg-white checked:border-2 checked:border-black checked:hover:bg-gray-100
                    transition duration-150 ease-in-out
                  "
                  // Overriding default radio styling with CSS to create the empty circle look
                  style={{
                    appearance: 'none',
                    borderRadius: '50%',
                    border: '1px solid #9ca3af', // Gray-400 equivalent for the outer circle
                    outline: 'none',
                    // This is the inner black dot for 'checked'
                    ...(level === option.value && {
                      boxShadow: 'inset 0 0 0 4px white, inset 0 0 0 5px black',
                      backgroundColor: 'white',
                      borderColor: 'black',
                    }),
                  }}
                />
                <span className="text-base text-gray-800">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Recommendation Section */}
        <div className="mb-8">
          <h2 className="text-xl font-normal mb-4">Recommendation :</h2>
          <div className="p-4 border border-gray-300 min-h-[50px] bg-white text-gray-500">
            Please select all options to get a recommendation
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoilConfigurator;