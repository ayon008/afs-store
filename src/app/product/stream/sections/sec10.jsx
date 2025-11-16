// components/SummarySection.js

import React from 'react';

const SummarySection = () => {
  return (
    // Outer container with a light gray background and some vertical padding
    <section className="bg-gray-100 py-24 px-4 sm:px-8 lg:px-16">
      
      {/* Max width container to center content, matching typical Next.js layouts */}
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid: This creates the two-column layout. 
            The left column is narrow/medium, and the right is left empty (or for an image/graphic). */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: The Summary Text Block */}
          <div className="text-gray-900">
            
            <h2 className="text-4xl font-extrabold mb-6">
              In summary
            </h2>
            
            <p className="text-xl leading-relaxed mb-12 max-w-lg">
              Thanks to its ultra-rigid **UPE construction**, the **STREAM** delivers instant, stable, and precise 
              traction, even in strong winds. Combined with a lightweight ripstop PE canopy, it remains 
              perfectly neutral when surfing and is unnoticeable during transitions.
            </p>

            {/* Sub-section with the two small notes, separated by a vertical line */}
            <div className="flex space-x-6 border-t pt-6 border-gray-400 max-w-xl">
              
              {/* Note 1: Left-aligned, bold text */}
              <div className="w-1/2">
                <p className="font-bold text-sm leading-snug">
                  With STREAM, skiing becomes fluid and instinctive.
                </p>
              </div>
              
              {/* Note 2: Right-aligned, standard text */}
              <div className="w-1/2 border-l pl-6 border-gray-400">
                <p className="text-sm leading-snug">
                  Every detail is designed to work with the dynamics of wind and water, connecting you to the natural flow of gliding.
                </p>
              </div>
            </div>
            
          </div>
          
          {/* Right Column: Left empty to match the original layout, which uses the space as negative space/background */}
          <div className="hidden lg:block">
            {/* Can be used for an image or other content if the design is expanded */}
          </div>

        </div>
      </div>
    </section>
  );
};

export default SummarySection;