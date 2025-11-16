// components/StreamWingSection.js

import Image from 'next/image';

const StreamWingSection = () => {
  // The image URL provided in the prompt
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-12.png.webp";

  return (
    <section className="bg-gray-50 py-16 md:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
      
      {/* Wing Image Container */}
      <div className="mb-12 max-w-2xl w-full">
        <Image 
          src={imageUrl} 
          alt="AFS STREAM wing for foiling" 
          width={768} 
          height={384} 
          layout="responsive" 
          className="mx-auto"
          priority 
        />
      </div>

      {/* Main Headline (Bold classes remain on the headline itself) */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 max-w-3xl">
        The science of flow, the feeling of flight
        {/* Removed **...** from the text */}
      </h2>

      {/* Sub-Headline / Description */}
      <p className="text-base sm:text-lg text-gray-700 mb-16 max-w-xl">
        Lightweight, intuitive, high-performance: It allows for free gliding and high efficiency while maintaining control.
        {/* Removed **...** from the text */}
      </p>

      {/* Feature Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full text-left">
        
        {/* Feature 1 */}
        <div className="text-sm text-gray-700 border-t pt-4 border-gray-300">
          <p>
            STREAM is unobtrusive when navigating. It allows you to focus fully on your line, your reading of the water, your sensations—but not on controlling your wing.
            {/* Removed **...** from the text */}
          </p>
        </div>

        {/* Feature 2 */}
        <div className="text-sm text-gray-700 border-t pt-4 border-gray-300">
          <p>
            Designed to excel in freeriding, freeflying, and waves, the STREAM is suitable for all types of riding—from intermediate to expert riders.
            {/* Removed **...** from the text */}
          </p>
        </div>

        {/* Feature 3 */}
        <div className="text-sm text-gray-700 border-t pt-4 border-gray-300">
          <p>
            Designed to adapt to all styles, the STREAM stays out of the way when needed, allowing riders to focus on the quality of the experience, but responds instantly when called upon.
            {/* Removed **...** from the text */}
          </p>
        </div>

      </div>
    </section>
  );
};

export default StreamWingSection;