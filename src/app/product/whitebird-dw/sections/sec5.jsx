import Image from 'next/image';

const BoardFeatureSection = () => {
  const boardImageLink = "https://afs-foiling.com/wp-content/uploads/2024/03/Whitebird-hull2-1-scaled.webp";

  return (
    // Outer container: Full width and height, using the dominant red background
    // We'll use a flex layout to define the two main columns: Image (Left) and Text (Right)
    <section className="bg-[#a92628] h-[100vh] flex">
      
      {/* 1. Left Column: Image Area (Flush to the left edge) */}
      <div className="relative w-1/2 min-h-screen hidden md:block overflow-hidden">
        {/* The image is a background-style element that fills the space. */}
        <Image
          src={boardImageLink}
          alt="Close-up of a white and red board with black tracking rails"
          // We set specific dimensions for optimization purposes, but let it cover the container
          width={900} 
          height={1200}
          priority
          className="w-full h-full object-cover transform scale-[1.3] origin-top-left" // Increased scale for the intense zoom effect
        />
      </div>

      {/* 2. Right Column: Text Content Area */}
      {/* Use w-full on mobile (when the image is hidden) and w-1/2 on desktop */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 lg:p-16">
        
        {/* Inner text container to constrain the text width */}
        <div className="text-white max-w-xl">
          
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Optimized housing positioning and rigidity
          </h2>
          
          {/* Descriptive Text */}
          <p className="text-lg md:text-xl font-light leading-relaxed">
            **Advanced gearboxes** provide ultra-light wind take-off capability. This positioning reduces the board's **inertia in flight**, allowing you to enjoy all the takeoff benefits of a long board with the feel of a small board.
          </p>
        </div>
        
      </div>
      
    </section>
  );
};

export default BoardFeatureSection;