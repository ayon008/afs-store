import React from 'react';

// This component would be located at `app/page.jsx` in a Next.js app
// It uses standard <img> tags because next/image requires configuration
// for external domains, which we can't do in a single file.

/**
 * Main component for the AFS Pure wings landing page section.
 */
export default function HomePage() {
  
  // Storing text content in an object for easy management
  const textContent = {
    title: "Camber profile",
    paragraph: "For these new versions of the Pures 700 and 900 (our pro riders’ favorite foils), we pushed the aspect ratio above 9 (700: 9.6 and 900: 9.2) while refining the profile across the entire wingspan and also the fuselage thanks to the Fuselink connection. The result is a foil that generates much less drag and therefore delivers much more glide, speed, and performance than in the past."
  };

  // URLs for the wing images provided in your prompt
  const images = {
    pure700: "https://afs-foiling.com/wp-content/uploads/2024/03/F_PureV2700_0001-2-1-1.png",
    pure900: "https://afs-foiling.com/wp-content/uploads/2024/03/F_PureV2900_0004-2.png"
  };

  /**
   * Fallback handler for broken image links.
   * Replaces the broken image with a placeholder.
   * @param {React.SyntheticEvent<HTMLImageElement, Event>} e - The event object
   */
  const handleImageError = (e) => {
    const target = e.currentTarget;
    const width = target.width || 1200; // Default width
    const height = target.height || 600; // Default height
    target.src = `https://placehold.co/${width}x${height}/000000/333333?text=Image+Not+Found`;
    target.alt = "Image not found";
  };

  return (
    // Main container: 
    // - min-h-screen: Ensures it's at least the full viewport height.
    // - bg-black, text-white: Matches the theme.
    // - flex, flex-col, items-center, justify-center: Centers the content.
    // - p-8: Adds padding for spacing.
    // - font-sans, antialiased: Sets a clean, modern font style.
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8 font-sans antialiased">
      
      <main className="flex flex-col items-center w-full">
        
        {/* --- Text Content Section --- */}
        {/* max-w-lg: Constrains the width of the text for readability. */}
        {/* text-center: Centers the headline and paragraph. */}
        {/* mb-12: Adds margin below the text, spacing it from the images. */}
        <section className="w-full max-w-lg text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            {textContent.title}
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            {textContent.paragraph}
          </p>
        </section>

        {/* --- Image Section --- */}
        {/* This is the container for the overlapping images. */}
        {/* relative: Establishes a positioning context for the absolute child. */}
        {/* w-full, max-w-4xl: Constrains the width of the images. */}
        {/* mx-auto: Centers the container. */}
        {/* mt-12: Adds space above the images. */}
        <section className="relative w-full max-w-4xl mx-auto mt-12">
          
          {/* PURE 700 Wing (Top Image) */}
          {/* This image is positioned relatively and given a z-10, so it */}
          {/* appears *in front* of the other image. */}
          <img
            src={images.pure700}
            alt="AFS Pure 700 Wing"
            className="relative z-10 w-full h-auto"
            onError={handleImageError}
          />

          {/* PURE 900 Wing (Bottom Image) */}
          {/* This image is positioned *absolutely* relative to the section. */}
          {/* It has a default z-0, so it sits *behind* the z-10 image. */}
          {/* top-16 sm:top-24 lg:top-32: This is the key. It pushes the */}
          {/* image down from the top of the container, creating the */}
          {/* precise overlap. The spacing is responsive to look good */}
          {/* on different screen sizes. */}
          {/* left-0, w-full: Ensures it spans the full width of the container. */}
          <img
            src={images.pure900}
            alt="AFS Pure 900 Wing"
            className="absolute top-16 sm:top-24 lg:top-32 left-0 w-full h-auto"
            onError={handleImageError}
          />
          
          {/* Note: The mast extending downwards in your screenshot */}
          {/* was not included in the two image URLs you provided, */}
          {/* so I have omitted it. This layout perfectly stacks the */}
          {/* two wing assets you supplied. */}

        </section>
      </main>
    </div>
  );
}
