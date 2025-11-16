import React from 'react';

// This is a simple Next.js page component.
// In a real Next.js app, you would place this file in the `app/` directory, for example `app/page.jsx`.
// It assumes you have Tailwind CSS configured in your Next.js project.

export default function FoilPage() {
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/Frame-28-1.png";

  return (
    // Main container
    // We set a height of 200vh to make it "two sections" tall, as requested.
    // The background image is applied here using inline styles for the URL.
    // Tailwind classes are used for cover, center, and no-repeat.
    <main
      className="relative w-full h-[200vh] bg-cover bg-center bg-no-repeat text-white overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
    >
      {/* Overlay for content positioning */}
      {/* We use a max-width container to keep text content from stretching too wide on large screens */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- Top Text Block --- */}
        {/* Positioned absolutely near the top-center */}
        <div className="absolute top-[15vh] left-1/2 -translate-x-1/2 w-11/12 max-w-lg text-center">
          <h2 className="text-3xl font-semibold text-black">
            Slashing effect
          </h2>
          <p className="mt-4 text-base text-black">
            As we've increased the wingspan, we've paid
            particular attention to maneuverability. Rolling, of
            course, but also yawing.
          </p>
          <p className="mt-4 text-base text-black">
            The foil is very playful and allows aggressive
            transitions with the possibility of skidding the
            stern with the right support.
          </p>
        </div>

        {/* --- Bottom Text Block --- */}
        {/* Positioned absolutely near the bottom-center */}
        <div className="absolute bottom-[30vh] left-1/2 -translate-x-1/2 w-11/12 max-w-4xl text-center">
          <h3 className="text-2xl font-semibold text-white-300">
            Bombproof freestyle construction
          </h3>
          <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            As our riders take part in events all
            over the world, we wanted <span className="text-blue-400">them to be
            reassured</span> by the equipment they use.
          </h1>
        </div>

        {/* --- Bottom Right Paragraph --- */}
        {/* Positioned absolutely at the bottom-right */}
        <div className="absolute bottom-[10vh] right-4 sm:right-8 lg:right-12 w-full max-w-sm">
          <p className="text-base text-gray-200">
            That's why our Pure range has been specially developed to
            handle the toughest landings. In particular, we have
            strengthened the wing/fuselage connection to achieve this.
          </p>
        </div>

      </div>
    </main>
  );
}
