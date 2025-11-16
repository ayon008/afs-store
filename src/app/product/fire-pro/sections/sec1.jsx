// components/ProHero.js
import Image from 'next/image';

const ProHero = () => {
  return (
    <div className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center">
      
      {/* Background Image - REVISED FOR PIXEL-PERFECT PLACEMENT */}
      {/*
        - `max-w-none` to prevent image scaling issues.
        - `w-[110rem]` (and `lg:w-[130rem]`) makes the image very large for the zoomed-in effect.
        - `top-[20rem]` (and `lg:top-[10rem]`) pulls the top of the image down.
        - `left-[-50rem]` (and `lg:left-[-40rem]`) pushes the left edge off-screen.
        - `transform -rotate-[15deg]` sets the angle. A negative rotation will
          make the top-right part of the image move downwards, and the bottom-left part move upwards.
          This helps position the nose up-right and tail down-left.
        - These values are carefully chosen to match the screenshot's perspective.
      */}
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2023/04/50PRO_1-2-1-1.png.webp"
        alt="AFS Pro Foil Board"
        width={1600}
        height={1600}
        priority={true}
        className="absolute z-0 
                   max-w-none 
                   w-[110rem] top-[20rem] left-[-50rem] 
                   lg:w-[130rem] lg:top-[10rem] lg:left-[-40rem]
                   transform -rotate-[15deg] 
                   opacity-90"
      />

      {/* Text Content (Unchanged) */}
      <div className="relative z-10 max-w-lg lg:max-w-xl p-8 md:p-16 lg:pl-32">
        
        {/* Main Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight">
          Ride like a
          <br />
          pro
        </h1>

        {/* Subheading */}
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-md">
          ultra-compact board for demanding riders
          who want to push the limits.
        </p>

        {/* Bottom Paragraphs */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-16 md:mt-24">
          <p className="text-xs uppercase max-w-[250px] leading-relaxed tracking-wider">
            THE SHAPE HAS BEEN OPTIMIZED TO LIMIT
            THE BOARD'S INERTIA. WHETHER IN
            FREESTYLE ROTATION OR WAVE RIDING
            TURNS...
          </p>
          <p className="text-xs uppercase max-w-[250px] leading-relaxed tracking-wider">
            IT'S ALSO PERFECT FOR RACING IN
            MODERATE TO HEAVY CONDITIONS.
            BOARD USED AND DEVELOPED BY OUR
            GWA RIDERS.
          </p>
        </div>
      </div>

    </div>
  );
};

export default ProHero;