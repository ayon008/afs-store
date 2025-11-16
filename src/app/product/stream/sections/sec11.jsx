// components/WingSizeStack.jsx (FIXED COLLAPSING ISSUE)

import React from 'react';

// Array of image URLs for the wings (unchanged)
const WING_IMAGES = [
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-29.png.webp", // Farthest back (z-0)
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-28.png.webp",
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-27.png.webp",
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-26.png.webp",
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-25.png.webp",
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-24.png.webp",
  "https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-23.png.webp", // Closest (z-30 or z-50)
];

// Array of wing sizes (used for the legend) (unchanged)
const WING_SIZES = [
  "3", "3.5", "4", "4.5", "5", "5.5", "6"
];

const WingSizeStack = () => {
  return (
    // Added z-50 to the section to ensure it layers above other general content
    <section className="relative bg-gray-100 py-4 overflow-hidden z-50">
      
      {/* Container for the Stacked Images:
          ***FIX: Removed max-w-7xl from this container to give the images maximum horizontal space***
          The combination of wide images and huge negative margins requires a wide container.
      */}
      <div className="flex justify-center items-end h-[300px] w-full mx-auto"> 
        
        {WING_IMAGES.map((url, index) => {
          // zIndex logic remains correct
          const zIndex = 60 - (index * 10);
          
          // Negative margin remains huge
          const offsetClass = index === WING_IMAGES.length - 1 
            ? 'ml-0' 
            : `ml-[-6rem] md:ml-[-8rem] lg:ml-[-10rem]`; 

          // Image width remains huge and responsive
          const widthClass = 'w-[350px] md:w-[400px]'; 

          const imageClass = "w-full h-full object-contain object-bottom transition-all duration-300 transform hover:scale-105";

          return (
            <div 
              key={index} 
              // Ensure 'relative' is here for z-index stacking context (which it is)
              className={`relative ${widthClass} h-full ${offsetClass} transition-transform duration-500`} 
              style={{ zIndex: zIndex }}
            >
              <img 
                src={url} 
                alt={`Wing Size ${WING_SIZES[index]}`}
                className={imageClass}
              />
            </div>
          );
        })}

      </div>
      
      {/* Footer Text and Color Options: max-w-7xl is kept here to align the text
          with standard page content. */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-4 px-4 sm:px-8 lg:px-16">
        
        {/* Available Sizes */}
        <p className="text-lg font-semibold text-gray-800 mb-2 md:mb-0">
          Available in: 
          <span className="font-bold ml-2">
            {WING_SIZES.join(' - ')} m
          </span>
        </p>
        
        {/* Color Options */}
        <div className="flex items-center text-lg text-gray-800">
          <p className="mr-4">The choice is yours</p>
          <div className="flex space-x-2">
            {/* Using Tailwind's direct color class for blue-500 and red-600 
                for better utility usage, replacing the custom hex codes. */}
            <span className="bg-blue-500 text-white font-bold px-3 py-1 rounded shadow-md">
              Blue
            </span>
            <span>or</span>
            <span className="bg-red-600 text-white font-bold px-3 py-1 rounded shadow-md">
              Red
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WingSizeStack;