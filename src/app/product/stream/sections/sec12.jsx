// components/MaterialsFocusSection.jsx

import React from 'react';

const MaterialsFocusSection = () => {
  return (
    // Outer container: Full width, minimum screen height, dark background
    <section className="min-h-screen w-full bg-[#1f1f1f] text-white flex flex-col p-8 sm:p-12 lg:p-20">
      
      {/* 1. Header */}
      <div className="mb-12 lg:mb-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold">
          Focus on materials
        </h2>
      </div>

      {/* 2. Materials Table (Main Content) */}
      <div className="flex-grow">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Table Header Row (Hidden on mobile if needed, but included here for structure) */}
          <div className="grid grid-cols-3 gap-6 py-4 border-b border-gray-600 text-sm font-bold uppercase tracking-wider text-gray-400">
            <div>ELEMENT</div>
            <div>MATERIAL</div>
            <div>FUNCTION</div>
          </div>

          {/* Table Data Rows */}
          {/* Data Array structure: [Element, Material, Function] */}
          {[
            ["Leading edge & center batten", "UPE FlowFrame™", "Stiffness + lightness at the ends"],
            ["Frame", "Reinforced Dacron", "Shape retention and tension"],
            ["Canopy", "Dual-weight ripstop PE", "Stability in the center, lightness in the rear"],
            ["Boom", "Carbon", "Control and precision"],
            ["Bag", "New design", "Compact, easy to store"],
          ].map(([element, material, functionDesc], index) => (
            <div 
              key={index} 
              className="grid grid-cols-3 gap-6 py-5 border-b border-gray-700 text-lg"
            >
              <div className="font-semibold text-gray-200">{element}</div>
              <div className="text-gray-300">{material}</div>
              <div className="text-gray-300">{functionDesc}</div>
            </div>
          ))}

        </div>
      </div>

      {/* 3. Footer Notes (Aligned to the bottom of the screen space) */}
      {/* Using grid to manage the 3-column layout at the bottom */}
      <div className="w-full max-w-6xl mx-auto border-t border-gray-700 pt-6 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-300">
          
          {/* Note 1: Boom compatibility */}
          <div>
            <p className="border-l pl-4 border-gray-500">
              Like the D-lite Boom, the Stream will be compatible with the **CLIP-ON mounting system**, available in a single size for all surfaces from 3 to 6 m².
            </p>
          </div>
          
          {/* Note 2: Single boom for multiple wings */}
          <div>
            <p className="border-l pl-4 border-gray-500">
              Riders will be able to use a **single boom** for two AFS wing models and/or multiple wing sizes – Stream or D-lite Boom – allowing them to travel lighter while optimizing their budget to complete their quiver.
            </p>
          </div>
          
          {/* Note 3: Bag redesign */}
          <div>
            <p className="border-l pl-4 border-gray-500">
              Its **carrying bag** has also been redesigned for easy storage with or without the wishbone for reduced bulk.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default MaterialsFocusSection;