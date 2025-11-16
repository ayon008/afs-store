import React from 'react';

// The URL for the background image provided by the user
const BACKGROUND_IMAGE_URL = "https://afs-foiling.com/wp-content/uploads/2024/10/DSC07209.png";

/**
 * A responsive hero section component cloned from the provided design.
 * It features a large background image, a dark overlay, and structured content.
 */
const App = () => {
  // Data for the size list at the bottom
  const sizes = [
    { label: "L: 7'6\" w: 18\"", volume: "V: 100 liters" },
    { label: "L: 7'6\" w: 20\"", volume: "V: 110 liters" },
    { label: "L: 8'0\" w: 17\"1/6", volume: "V: 105 liters" },
    { label: "L: 8'0\" w: 19\"1/2\"", volume: "V: 120 liters" },
    { label: "L: 8'4\" w: 17\"", volume: "V: 106 liters" },
    { label: "L: 8'4\" w: 19\"", volume: "V: 115 liters" },
    { label: "L: 8'4\" w: 21\"", volume: "V: 130 liters" },
    { label: "L: 8'8\" w: 16\"1/2", volume: "V: 110 liters" },
    { label: "L: 8'8\" w: 18\"1/2", volume: "V: 120 liters" },
    { label: "L: 8'8\" w: 20\"1/2", volume: "V: 135 liters" },
  ];

  // The size list content is combined into a single line to match the original layout
  const sizeList = sizes.map((s, index) => (
    <React.Fragment key={index}>
      <span className="font-semibold">{s.label}</span>
      <span className="font-light mr-4">{s.volume}</span>
      {/* Add separator pipe for all but the last item */}
      {index < sizes.length - 1 && <span className="mx-2 text-gray-400">|</span>}
    </React.Fragment>
  ));


  return (
    <div className="relative min-h-screen w-full font-inter">
      {/* Background Image Container */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${BACKGROUND_IMAGE_URL}')`,
          // Ensure the image covers the area completely
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay with Gradient to Match the Original's Contrast */}
        {/* The overlay is strong and fades slightly towards the bottom for the list */}
        <div className="absolute inset-0 bg-black opacity-80 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30"></div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen text-white p-6 sm:p-12 lg:p-20">
        {/* Top Spacer to push content down - The design shows content starting below the middle of the screen */}
        <div className="flex-grow pt-40 md:pt-48 lg:pt-60"></div>

        {/* --- Main Content Area --- */}
        <div className="mb-8">
          {/* Header */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 drop-shadow-lg">
            Ultimate adaptability
          </h1>

          {/* Body Columns: Stacks on mobile, side-by-side on larger screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Left Column (Main Feature Text) */}
            <div className="lg:col-span-2">
              <p className="text-xl sm:text-2xl lg:text-3xl font-extrabold leading-tight tracking-wide uppercase drop-shadow-md">
                WE HAVE EXPANDED THE RANGE WITH NEW SIZES TO MEET THE EXPECTATIONS OF DOWNWIND RIDERS, WHETHER THEY ARE INTERMEDIATE OR EXPERT.
              </p>
            </div>

            {/* Right Column (Supporting Details) - Aligns with the lower half of the main text */}
            <div className="lg:col-span-1 flex flex-col space-y-6 text-gray-200 text-sm sm:text-base lg:text-lg lg:mt-12">
              <p className="drop-shadow-sm">
                These new sizes have also led to changes in shape to adapt to the most efficient foils currently available, particularly for downwind and wingfoiling in light winds.
              </p>
              <p className="drop-shadow-sm">
                The long box of the Blackbird V3 also allows it to adapt perfectly to all types of foils on the market.
              </p>
            </div>
          </div>
        </div>

        {/* --- Footer/Size List Area --- */}
        <div className="mt-auto pt-8">
          {/* Sizes Header */}
          <p className="text-sm font-medium mb-2 text-gray-300">
            Here are the 10 sizes available to suit all activities:
          </p>

          {/* Sizes List (Kept inline/wrapping to match the original image) */}
          <div className="text-xs sm:text-sm font-medium leading-relaxed flex flex-wrap items-baseline">
            {sizeList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
