import React from 'react';

/**
 * A React component for "Section 5" of the AFS Foiling website.
 * This section showcases the "Fuse Link Connexion" with a large
 * background image and descriptive text.
 *
 * To use this in Next.js, save it as e.g., `components/FuseLinkSection.jsx`
 * and import it into your page.
 */
export default function FuseLinkSection() {
  const backgroundImageUrl = 'https://afs-foiling.com/wp-content/uploads/2025/09/Fuselink_1000_4-1-2.png';

  return (
    <section className="relative w-full h-screen min-h-[700px] bg-black text-white overflow-hidden">
      {/* Background Image */}
      {/* This div holds the background image, positioned to the right and set to cover */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-no-repeat bg-right"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
        // Add an aria-label for accessibility, as the image is decorative
        // but provides context.
        role="img"
        aria-label="Carbon fiber hydrofoil components"
      />

      {/* Gradient Overlay */}
      {/* This overlay ensures text readability over the image,
          fading from solid black on the left to transparent. */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* Content */}
      {/* This container centers the content block and ensures
          it sits on top of the background and gradient. */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex h-full items-center">
          {/* Text Block */}
          {/* This block is constrained in width to match the design. */}
          <div className="max-w-lg">
            <h2 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Fuse Link
              <br />
              Connexion
            </h2>
            <p className="mt-6 text-base md:text-lg text-gray-200 leading-relaxed">
              This system uses a conical assembly to
              connect the mast to the fuselage, thereby
              preserving the latter’s inertia. We have also
              refined the fuselage to maximize its
              performance, ensuring exceptional rigidity and
              optimal flow. Installation is a breeze with just
              two M8 screws.
            </p>
            <a
              href="#" // Replace with your actual link
              className="inline-block mt-8 text-sm font-bold uppercase tracking-wider text-red-600 hover:text-red-500 transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}