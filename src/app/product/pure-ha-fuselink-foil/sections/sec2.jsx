'use client';
import React from 'react';

export default function AspectRatioSection() {
  return (
    <div className="bg-black text-white w-full min-h-screen p-8 md:p-16 lg:p-24 flex items-center justify-center font-['alliance_no.2',sans-serif]">
      <div className="container mx-auto max-w-7xl">
        {/* Grid for two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Column 1: Text Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <h2
              className="text-[50px] leading-[55px] font-bold text-white"
            >
              The aspect ratio
            </h2>

            <p
              className="text-[24px] leading-[28.8px] font-normal text-white"
            >
              The aspect ratio of 11 for the Pure HA1100 and 13 for the Pure HA800 offers superior levels of glide, while their highly developed, specialized and expert design also offers a welcome ease of use.
            </p>

            <p
              className="text-[24px] leading-[28.8px] font-normal text-white"
            >
              Efficient lift allows you to glide for as long as possible and make the most of every bump and swell that comes your way. This is made possible by an impressive evolution of the speed range, fast and slow speed capabilities, efficient take-off, low stall speed, and high pumping speed for foils of this size.
            </p>

            <p
              className="text-[24px] leading-[28.8px] font-normal text-white"
            >
              The PURE HA800 and PURE HA1100 also feature very thin foil sections for maximum glide at very high speeds.
            </p>
          </div>

          {/* Column 2: Image Content */}
          <div className="relative w-full min-h-[350px] sm:min-h-[450px] lg:min-h-[600px] order-1 lg:order-2">
            {/* Background Image: Avion 1100 */}
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/03/Avion_1100_2.png"
              alt="Avion 1100 Foil"
              className="absolute w-full max-w-md md:max-w-lg lg:max-w-2xl transform -rotate-[25deg] translate-x-[-5%] sm:translate-x-[-10%] translate-y-[-10%] transition-all duration-300"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              loading="lazy"
            />

            {/* Foreground Image: Avion 800 */}
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/03/Avion_800_2.png"
              alt="Avion 800 Foil"
              className="absolute w-full max-w-md md:max-w-lg lg:max-w-2xl transform -rotate-[25deg] translate-x-[5%] sm:translate-x-[10%] translate-y-[15%] transition-all duration-300"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </div>
  );
}
