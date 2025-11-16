// ./components/AfsUltimateShape.jsx

import Image from 'next/image';

// --- Image Size Calculation ---
const targetImageWidth = 280; // Keep images smaller

const img1Height = Math.round((targetImageWidth / 213) * 1024); // ~1348px
const img2Height = Math.round((targetImageWidth / 512) * 1024); // ~560px

export default function AfsUltimateShape() {
  return (
    <section className="relative w-full bg-black text-white py-24 pb-40">
      
      {/* --- Top Text Block (Unchanged) --- */}
      <div className="max-w-2xl mx-auto text-center px-6">
        <h2 className="text-5xl lg:text-6xl font-extrabold">
          Ultimate shape
        </h2>
        <p className="text-lg font-bold uppercase mt-8 tracking-wide">
          UHM MASTS ARE DESIGNED WITH A SUPER-THIN PROFILE AND REDUCED CHORD,
          RESULTING IN PURE GLIDE AND OPTIMAL RIGIDITY.
        </p>
        <p className="text-lg text-gray-300 mt-4 font-light">
          Despite their thinness, these masts offer perfect flex and twist
          control. This rigidity ensures precise steering and flawless
          control of the foil, for maximum sensations.
        </p>
      </div>

      {/* --- Image Block with Overlays - NOW WIDER & CENTERED --- */}
      {/* max-w-screen-xl ensures enough space for side text, mx-auto centers it */}
      <div className="flex flex-row justify-center items-start gap-8 mt-16 px-6 max-w-screen-xl mx-auto">
        
        {/* Image 1: Side Profile + Overlays */}
        <div className="relative flex-shrink-0"> {/* flex-shrink-0 to prevent images from shrinking */}
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2025/09/imgonline-com-ua-Replace-color-q7ChPdhKkGjnz-1-e1740772997214-1.png"
            alt="Mast side profile"
            width={targetImageWidth}
            height={img1Height}
            priority
            className="object-contain"
          />
          {/* Top-left text overlay - Positioned relative to image's top-right corner, pushed left */}
          <div className="absolute top-[18%] right-[calc(100%_+_1.5rem)] text-white font-bold text-sm leading-tight whitespace-nowrap text-right"> {/* Adjusted positioning */}
            <p>CHORD 120 MM</p>
            <p>THICKNESS 14.3 MM</p>
          </div>
          {/* Bottom-left text overlay - Positioned relative to image's middle-right corner, pushed left */}
          <div className="absolute top-[50%] right-[calc(100%_+_1.5rem)] text-gray-400 text-xs tracking-wider whitespace-nowrap text-right"> {/* Adjusted positioning */}
            <p>FORMER - PERFORMER UHM</p>
          </div>
        </div>
        
        {/* Image 2: Front Profile + Overlays */}
        <div className="relative flex-shrink-0"> {/* flex-shrink-0 to prevent images from shrinking */}
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2025/09/image-1-4-e1740772874693-1.png"
            alt="Mast front profile"
            width={targetImageWidth}
            height={img2Height}
            priority
            className="object-contain"
          />
          {/* Top-right text overlay - Positioned relative to image's top-left corner, pushed right */}
          <div className="absolute top-[18%] left-[calc(100%_+_1.5rem)] text-white font-bold text-sm leading-tight whitespace-nowrap text-left"> {/* Adjusted positioning */}
            <p>CHORD @115 MM</p>
            <p>THICKNESS 13.5 MM</p>
          </div>
          {/* Bottom-right text overlay - Positioned relative to image's middle-left corner, pushed right */}
          <div className="absolute top-[50%] left-[calc(100%_+_1.5rem)] text-red-500 text-xs font-bold tracking-wider whitespace-nowrap text-left"> {/* Adjusted positioning */}
            <p>NEW - FUSE LINK UHM</p>
          </div>
        </div>
      </div>

      {/* --- NEW Bottom Text Block --- */}
      <div className="max-w-3xl mx-auto text-center px-6 mt-40">
        <p className="text-sm font-bold uppercase tracking-wide leading-relaxed mb-6">
          THE CHORD LENGTH OF THESE MASTS HAS BEEN REDUCED COMPARED WITH
          PERFORMER UHM MASTS, FROM 120 MM TO 115 MM FOR THE UHM 85 MAST,
          FOR EXAMPLE. THEIR AVERAGE THICKNESS IS 13.5 MM (14.3 MM FOR
          PERFORMER UHM MASTS).
        </p>
        <p className="text-sm text-gray-300 mt-6 font-light leading-relaxed mb-6">
          BY COMPARISON, AN ALUMINUM MAST WITH EQUIVALENT RIGIDITY MEASURES
          AROUND 19 MM AND WEIGHS TWICE AS MUCH. THE RESULT IS A RESPONSIVE,
          FLUID AND PLAYFUL FOIL.
        </p>
        <p className="text-sm text-gray-300 mt-6 font-light leading-relaxed">
          Their shape is the result of a perfect balance between minimal
          thickness, reduced chord, and a lightweight, rigid construction.
        </p>
      </div>
    </section>
  );
}