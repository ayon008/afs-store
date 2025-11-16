// RigidSupport.js (Aggressive Upward Shift)

import React from 'react';

const RigidSupport = () => {
  return (
    // Outer container: Ensure no vertical padding/margins here.
    <section className="px-4 md:px-8 lg:px-16 xl:px-32 **my-0 py-0**">
      
      {/* Inner container: Also remove any vertical padding/margins. */}
      <div className="max-w-7xl mx-auto **mt-0 pt-0** pb-8"> 
        
        {/* Title: Remove the browser's default top margin on the H2 tag 
            using 'mt-0' and rely only on the 'mb-6' for spacing below it. */}
        <h2 className="text-[32px] md:text-4xl font-extrabold text-gray-900 **mt-0** mb-6">
          A rigid and breathable support structure
        </h2>

        {/* Content Columns Container - (No changes needed here) */}
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          
          {/* Column 1: Main UPE description */}
          <div className="lg:max-w-[40%] text-xl leading-relaxed text-gray-800 mb-6 lg:mb-0">
            <p>
              Thanks to its <span className="font-bold">UPE (Ultra High Molecular Weight PolyEthylene)</span> construction, this wing offers <span className="font-extrabold">excellent glide and a very low coefficient of friction.</span> UPE allows the size of the tubes to be significantly reduced, thereby decreasing <span className="font-bold">drag and weight.</span>
            </p>
          </div>

          {/* Column 2 & 3 Container */}
          <div className="flex flex-col sm:flex-row lg:flex-1 sm:space-x-8">
            
            {/* Column 2: Inflatable tubes */}
            <div className="sm:w-1/2 text-base leading-relaxed text-gray-700 mb-6 sm:mb-0">
              <p>
                The UPE inflatable tubes combined with a reinforced Dacron frame and a dual-grammage canopy give the wing excellent shape retention, even in gusts. Less deformation under load for more precise navigation, better pumping efficiency, and a more responsive ride.
              </p>
            </div>

            {/* Column 3: New canopy/leading edge */}
            <div className="sm:w-1/2 text-base leading-relaxed text-gray-700">
              <p>
                New canopy/leading edge connection system to optimize force transmission. On this part of the wing, the UPE allows instantaneous power transmission for sharp accelerations and better control at high speeds.
              </p>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
};

export default RigidSupport;