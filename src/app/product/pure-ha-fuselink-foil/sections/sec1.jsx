import React from 'react';

export default function FoilHero() {
  return (
    // Main container: full-screen height, black background
    <main className="flex h-screen w-full items-end bg-black">
      
      {/* Content wrapper: adds padding from the edges */}
      <div className="p-10 md:p-16 lg:p-24">
        
        {/* Text block: large, bold, and width-constrained to match line breaks */}
        <h1 className="max-w-xl text-4xl font-bold leading-tight md:max-w-2xl md:text-5xl lg:max-w-3xl lg:text-6xl">
          
          {/* Part 1: White text */}
          <span className="text-white">
            The PURE HA800 and PURE HA1100,{' '}
          </span>
          
          {/* Part 2: Pale yellow text */}
          {/* text-[#ffffcc] is a close match for the image's highlight color */}
          <span className="text-[#ffffcc]">
           are extremely efficient foils that excel in low to moderate power sources.
          </span>
        </h1>
      </div>
    </main>
  );
}