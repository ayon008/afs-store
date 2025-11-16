import React from 'react';

// The main component that wraps the HeroSection for single-file deployment.
const App = () => {
  return <HeroSection />;
};

// The Hero Section component
const HeroSection = () => {
  return (
    // Set height to 30vh and use a very light gray background, similar to the image.
    // Use flexbox to vertically and horizontally center the content.
    <section 
      className="flex flex-col items-center justify-center 
                 h-[30vh] w-full bg-gray-50 text-center 
                 p-8 font-sans transition duration-300 ease-in-out"
    >
      <div className="max-w-3xl px-4">
        {/* Main Heading: Large, bold, and dark */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Tests and reviews
        </h1>

        {/* Subtext: Smaller, standard weight, and darker gray */}
        <p className="text-base sm:text-lg md:text-xl font-normal text-gray-700">
          Find out what the trade press has to say about our products
        </p>
      </div>
    </section>
  );
};

export default App;
