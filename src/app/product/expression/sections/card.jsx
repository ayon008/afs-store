import React from 'react';

const CareneCard = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-6xl bg-black text-white rounded-2xl p-12 shadow-lg">
        <h2 className="text-5xl font-bold text-center mb-6">
          Carene
        </h2>
        <p className="text-lg text-neutral-300 text-center max-w-3xl mx-auto leading-relaxed">
          The Expression's hull contains a meticulous work of multiple values. The V on the stern ensures maneuverability, a good pivot for carving and control at high speeds or in strong winds. A concave stretches the scoop line under the foot area to accelerate the shape. It evolves in a double concave V on the front third to free up the rail and increase maneuverability while maintaining acceleration and speed on the flat or in curves. Because the key to success in waves is speed!
        </p>
      </div>
    </div>
  );
};

export default CareneCard;