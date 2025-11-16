"use client";

import React from "react";

/**
 * Dotted map background component
 */
const DottedMapBackground = () => (
  <svg
    className="absolute inset-x-0 bottom-0 w-full h-auto opacity-5 sm:opacity-10 pointer-events-none"
    viewBox="0 0 1440 600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="xMidYMin slice"
  >
    <defs>
      <pattern id="dotPattern" width="12" height="12" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="0.5" fill="#1F2937" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dotPattern)" />

    <g filter="url(#glow)">
      <circle cx="700" cy="400" r="12" fill="#3B82F6" />
      <circle cx="750" cy="450" r="8" fill="#3B82F6" />
      <circle cx="650" cy="500" r="10" fill="#3B82F6" />
      <circle cx="820" cy="380" r="6" fill="#3B82F6" />
    </g>

    <defs>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feFlood floodColor="#3B82F6" floodOpacity="1" result="flood" />
        <feComposite in="flood" in2="blur" operator="in" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

/**
 * Main header component
 */
const AmbassadorsHeader = () => {
  return (
    <header className="relative bg-white min-h-[480px] sm:min-h-[550px] overflow-hidden border-b-2 border-gray-100">
      <DottedMapBackground />

      {/* Content container */}
      <div className="container mx-auto px-6 lg:px-12 py-8 relative z-10">
        <div className="max-w-5xl pt-8 md:pt-16">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight leading-tight">
            <span className="text-gray-900">AFS Ambassadors </span>
            <span className="text-blue-600">team</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

/**
 * Main App
 */
export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <AmbassadorsHeader />
    </div>
  );
}
