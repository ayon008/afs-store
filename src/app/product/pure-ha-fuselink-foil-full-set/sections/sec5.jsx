'use client';
import React from 'react';

/**
 * A React component for a Next.js/Tailwind project, replicating the provided website section.
 *
 * This component features:
 * - A dark theme with white text.
 * - A central headline.
 * - A continuously scrolling text marquee.
 * - A central image that overlays the marquee using z-index.
 * - A two-column text section below the image.
 * - A floating chat bubble icon.
 *
 * The marquee animation is defined using `styled-jsx`,
 * which is built into Next.js and keeps all styles within this single file.
 */
export default function FoilSection() {
  // The text for the scrolling marquee
  const marqueeText = "The PURE HA800 and HA1100 are incredible, high-performance foils that remain fun and accessible.";

  return (
    <>
      {/*
        This <style> tag uses styled-jsx, which is built into Next.js.
        It allows us to define the keyframes for the marquee animation
        while keeping everything in a single component file.
        The `global` prop allows us to define the animation and class.
      */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>

      {/* Main container with black background and white text */}
      <div className="relative flex flex-col items-center min-h-screen bg-black text-white font-['Inter',_sans-serif] py-20 px-4 sm:px-6 lg:px-8 overflow-x-hidden">

        {/* 1. Top Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center max-w-4xl mx-auto mb-16 z-10">
          It's a very versatile and easy-to-use foil, despite its theoretically exclusive design.
        </h1>

        {/* 2. Image & Marquee Container */}
        {/* This container uses relative positioning to stack the marquee and image */}
        <div className="relative w-full max-w-7xl mx-auto h-80 sm:h-96 flex items-center justify-center mb-16">

          {/* Marquee (Background, z-0) */}
<div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-screen overflow-hidden whitespace-nowrap z-0 bg-white">
  <div className="flex animate-marquee">
    {/* Repeat text and dot multiple times for seamless scrolling */}
    <span className="text-2xl font-bold uppercase mx-4 text-black">{marqueeText}</span>
    <span className="text-red-600 mx-2 text-2xl">•</span>
    <span className="text-2xl font-bold uppercase mx-4 text-black">{marqueeText}</span>
    <span className="text-red-600 mx-2 text-2xl">•</span>
    <span className="text-2xl font-bold uppercase mx-4 text-black">{marqueeText}</span>
    <span className="text-red-600 mx-2 text-2xl">•</span>
    <span className="text-2xl font-bold uppercase mx-4 text-black">{marqueeText}</span>
    <span className="text-red-600 mx-2 text-2xl">•</span>
  </div>
</div>


          {/* Image (Foreground, z-10) */}
          <div className="relative z-10 w-full max-w-lg mx-auto px-4">
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/03/image-32.png"
              alt="AFS Foiling PURE HA800"
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              // Fallback placeholder in case the image fails to load
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://placehold.co/600x400/000000/FFFFFF?text=Foil+Image+Not+Found";
              }}
            />
          </div>
        </div>

        {/* 3. Bottom Text Columns */}
        {/* This grid is also z-10 to ensure it appears over any part of the marquee */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-8">
          <div className="text-lg leading-relaxed">
            <p>The ideal use for these two foils is wing foiling, downwind riding, and of course, high-performance SUP foiling in downwind conditions, taking advantage of the exceptional glide these foils have to offer.</p>
          </div>
          <div className="text-lg leading-relaxed">
            <p className="font-bold mb-2">You can also foil surf with these two PURE HA 800 and 1100.</p>
            <p>In small sources of energy, in small soft waves, the exceptional glide of these foils means they can pump and ride their way around the spot, making multiple connections.</p>
          </div>
        </div>
      </div>
    </>
  );
}
