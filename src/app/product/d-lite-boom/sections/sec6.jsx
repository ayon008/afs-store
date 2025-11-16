// components/BoomSection.js or app/page.js

'use client'; // Required if using the App Router for client-side functionality (GSAP)

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins globally (do this once in your app, e.g., in a layout or at the top of your main component)
gsap.registerPlugin(ScrollTrigger);

const BoomSection = () => {
  const textRef = useRef(null);

  // The D-LITE boom image URL and alt text
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2025/01/en_biais.png.webp";
  const altText = "Red and white D-LITE boom for pre-order";

  // --- GSAP Animation Logic (Step 3) ---
  useEffect(() => {
    // Ensure the text element is available
    if (textRef.current) {
      // Define the animation: transition text color from gray to white
      gsap.to(textRef.current, {
        color: 'rgb(255, 255, 255)', // Target white color
        duration: 1.5, // Duration of the animation
        ease: 'power1.inOut',
        scrollTrigger: {
          trigger: textRef.current, // Element that starts the ScrollTrigger
          start: 'top center', // Start when the top of the text hits the center of the viewport
          end: 'bottom center', // End when the bottom of the text leaves the center of the viewport
          scrub: true, // Smoothly link the animation progress to the scroll position
          // markers: true, // Uncomment for visual debugging
        },
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 overflow-hidden relative z-50">
      <div className="flex max-w-7xl w-full items-center justify-between">
        
        {/* Text Container */}
        <div className="w-1/2 pr-12">
          {/* GSAP Target: Start with a light gray color (e.g., text-gray-500) */}
          <p
            ref={textRef}
            className="text-5xl font-light leading-snug text-gray-500" // Initial gray color from Tailwind
            style={{ fontSize: '3rem' }} // You might use an arbitrary value for exact sizing
          >
            The D-LITE boom is available for pre-order.
          </p>
        </div>

        {/* Image Container */}
        {/* Image Container */}
<div className="w-1/2 flex justify-end">
  <div className="relative w-[700px] h-[400px] transform translate-x-1/4">
    <Image
      src={imageUrl}
      alt={altText}
      fill
      style={{ objectFit: 'contain' }}
      unoptimized
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  </div>
</div>

      </div>
    </div>
  );
};

export default BoomSection;