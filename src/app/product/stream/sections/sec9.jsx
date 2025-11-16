// components/DurableMaterialsSection.js

import React from 'react';

const DurableMaterialsSection = () => {
  // The image should be placed in your public folder (e.g., public/pp_blue0005-1.png)
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2025/09/pp_blue0005-1.png";

  return (
    <section className="relative w-full h-[600px] overflow-hidden bg-gray-100">
      {/* 1. Image Container - Set to cover the entire section */}
      <div className="absolute inset-0">
        <img
          src={imageUrl}
          alt="Close-up of durable material with diamond grid pattern"
          className="w-full h-full object-cover" 
          // object-cover ensures the image fills the container while maintaining aspect ratio
          // For more precise sizing like the original, you might need to adjust the height (h-[600px]) 
          // and use object-position based on the content of your image.
        />
      </div>

      {/* 2. Text Box with Blur Effect */}
      {/* Positioned near the bottom right, with specific padding and background color */}
      <div 
        className="absolute right-0 bottom-0 p-8 m-10 w-96 
                   bg-white/50 backdrop-blur-sm text-black"
        // bg-white/50 sets a semi-transparent white background
        // backdrop-blur-sm applies the blur effect to the content *behind* the box
        // w-96 sets a fixed width (like 24rem or 384px) for the box
      >
        <h3 className="text-2xl font-bold mb-3">
          Materials selected for their durability
        </h3>
        <p className="text-lg">
          Woven **UPE**, durable **Dacron**, spinnaker with differentiated weight – the **STREAM** is designed to withstand harsh conditions without 
          <span className="opacity-0">feltering.</span>
          {/* The opacity-0 is a trick to visually crop the last word, mirroring the original image */}
        </p>
      </div>
    </section>
  );
};

export default DurableMaterialsSection;