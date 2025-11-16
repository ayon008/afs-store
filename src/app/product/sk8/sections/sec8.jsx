import React from 'react';

/**
 * A reusable component for the repeating tape pattern.
 */
const TapeStrip = ({ text, className = '' }) => {
  // This creates the repeating "TEXT + ICON" pattern
  const pattern = (
    <div className="flex flex-nowrap items-center gap-3">
      <span className="text-2xl font-black italic tracking-tighter">
        {text}
      </span>
      {/* SVG PLACEHOLDER
        Replace this <svg> block with your actual inline SVG code.
      */}
      <svg
        className="h-5 w-24" // Adjust width/height as needed
        viewBox="0 0 100 20" // Adjust viewBox to match your SVG's artboard
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ↓↓↓ ADD YOUR SVG <path> DATA HERE ↓↓↓ */}
        <rect x="0" y="0" width="100" height="2" />
        <rect x="0" y="5" width="100" height="2" />
        <rect x="0" y="10" width="100" height="2" />
        <rect x="0" y="15" width="100" height="2" />
      </svg>
    </div>
  );

  return (
    <div
      className={`
        absolute flex items-center p-2 py-1 text-white
        bg-[#cb6b26]
        ${className}
      `}
    >
      {/* We render the pattern multiple times to ensure it fills the strip */}
      <div className="flex flex-nowrap items-center gap-3 whitespace-nowrap">
        {Array(15)
          .fill(0)
          .map((_, i) => (
            <React.Fragment key={i}>{pattern}</React.Fragment>
          ))}
      </div>
    </div>
  );
};

/**
 * The main section component that creates the crossing tape effect.
 */
const TapeSection = () => {
  return (
    <div
      className="
        relative w-full bg-black overflow-hidden
        h-[50vh]
      "
    >
      {/* Top Strip: AFS */}
      <TapeStrip
        text="AFS"
        className="top-1/4 -left-1/4 w-[150%] rotate-[-20deg]"
      />

      {/* Bottom Strip: SK8 */}
      <TapeStrip
        text="SK8"
        className="top-1/2 -left-1/4 w-[150%] rotate-[20deg]"
      />
    </div>
  );
};

export default TapeSection;
