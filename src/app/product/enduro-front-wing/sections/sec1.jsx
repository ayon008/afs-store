import React from 'react';

// This is the main component for the page.
// In Next.js, this file would typically be app/page.jsx
export default function HomePage() {
  return (
    // Main container: black background, white text, full screen, and overflow hidden
    // We use the Inter font, a common choice with Tailwind.
    <main className="relative flex min-h-screen items-center overflow-hidden bg-black p-8 text-white md:p-16 lg:p-24" style={{ fontFamily: 'Inter, sans-serif' }}>
      
      {/* Text Content */}
      {/* This container is positioned relatively with a z-index to ensure it stays above the image */}
      <div className="relative z-10 max-w-md">
        <h1 className="mb-6 text-5xl font-bold md:text-7xl">
          All road performance
        </h1>
        <p className="text-lg text-gray-300 md:text-xl">
          Discover the brand new Enduro
          range with <span className="text-blue-500">an aspect ratio of 11</span>,
          which manages to combine two
          usually opposing qualities in an
          exceptional way: maneuverability
          and glide.
        </p>
      </div>

      {/* Image Container */}
      {/* This container is positioned absolutely to float behind and to the right of the text. */}
      {/* We use top-1/2 and -translate-y-1/2 to center it vertically. */}
      {/* It's shifted to the left (left-1/4) and given a large width to extend off-screen, mimicking the screenshot. */}
      {/* pointer-events-none ensures the image doesn't block mouse interactions with text. */}
      <div className="absolute left-1/4 top-1/2 z-0 w-full max-w-5xl -translate-y-1/2 pointer-events-none md:left-1/3 lg:max-w-7xl">
        <img
          src="https://afs-foiling.com/wp-content/uploads/2024/10/Enduro900_CF_UHM75_0006-5-1.png"
          alt="Enduro 900 Foil"
          className="h-auto w-full object-contain"
          // Fallback in case the image fails to load
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1200x800/111111/333333?text=Image+Not+Found";
            e.currentTarget.alt = "Image placeholder";
          }}
        />
      </div>

      {/* Chat Bubble Icon */}
      {/* Positioned fixed in the bottom-right corner with a high z-index. */}
    
    </main>
  );
}
