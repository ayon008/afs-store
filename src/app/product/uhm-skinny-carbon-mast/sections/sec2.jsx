// ./components/AfsMastsDisplay.jsx

"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register the ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function AfsMastsDisplay() {
  const imageHeight = 600;
  const imageOverlap = 100;
  
  const container = useRef(null);

  useGSAP(() => {
    // 1. Animate the masts
    gsap.from(".mast-image", {
      y: 300,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // 2. Animate the text block
    gsap.from([".mast-title", ".mast-p1", ".mast-p2"], {
      x: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.5,
      scrollTrigger: {
        trigger: container.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // 3. MODIFICATION: Control z-index of the ENTIRE SECTION
    // This controls how this whole component stacks against other
    // components on the page (like a sticky header).
    ScrollTrigger.create({
      trigger: container.current, // The whole section
      start: "top 80%",           // A bit before it's fully in view
      end: "bottom 20%",          // A bit before it's fully out of view
      
      // Set a higher z-index when in view
      onEnter: () => gsap.set(container.current, { zIndex: 30 }),
      onEnterBack: () => gsap.set(container.current, { zIndex: 30 }),
      
      // Reset to the default z-index when out of view
      onLeave: () => gsap.set(container.current, { zIndex: 10 }),
      onLeaveBack: () => gsap.set(container.current, { zIndex: 10 }),
    });

  }, { scope: container });

  return (
    // MODIFICATION: Added a default z-index (z-10) to the section itself.
    // GSAP will now toggle this value.
    <section 
      ref={container} 
      className="relative w-full bg-black text-white overflow-hidden z-10"
    >
      
      {/* Fade Overlay: Stays at z-50 */}
      <div className="absolute bottom-0 left-0 w-full h-96 bg-gradient-to-t from-black to-transparent z-50"></div>
      
      {/* Left side: Stacked Images */}
      <div className="relative h-full flex items-start justify-start pl-8 lg:pl-24 py-16 overflow-x-auto lg:overflow-visible">
        
        {/* Images: Max z-index is z-40 */}
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/09/UHM75_S_carbon-1-2.png"
          alt="AFS UHM Carbon 75 Mast"
          width={Math.round((imageHeight / 2048) * 861)}
          height={imageHeight}
          priority
          className="object-contain relative z-40 mast-image"
        />
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/09/UHM80-1-1-1-1.png"
          alt="AFS UHM Carbon 80 Mast"
          width={Math.round((imageHeight / 2048) * 902)}
          height={imageHeight}
          priority
          className={`object-contain relative z-30 ml-[-${imageOverlap}px] mast-image`}
        />
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/09/UHM85-1-1-1.png"
          alt="AFS UHM Carbon 85 Mast"
          width={Math.round((imageHeight / 2048) * 943)}
          height={imageHeight}
          priority
          className={`object-contain relative z-20 ml-[-${imageOverlap}px] mast-image`}
        />
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/09/UHM75_S_carbon-1-2.png" 
          alt="AFS UHM Carbon 95 Mast"
          width={Math.round((imageHeight / 2048) * 861)}
          height={imageHeight}
          priority
          className={`object-contain relative z-10 ml-[-${imageOverlap}px] mast-image`}
        />
      </div>

      {/* Right side: Text Content */}
      {/* MODIFICATION: Set z-index to z-[60] permanently.
        This is higher than the fade (z-50) and images (z-40),
        so it is *always* on top *within this section*.
      */}
      <div className="mast-text-container absolute top-24 left-1/2 -translate-x-1/2 w-11/12 text-center 
                      lg:text-right lg:left-auto lg:top-1/2 lg:-translate-y-1/2 lg:-translate-x-0 
                      lg:right-[10%] max-w-sm lg:max-w-md z-[60]">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 mast-title">
          Choose the one
        </h2>
        <p className="text-sm lg:text-base leading-relaxed mb-4 mast-p1">
          AVAILABLE IN 75CM, 80CM, 85CM AND 95CM, THE UHM CARBON MAST IS READY
          FOR ALL DISCIPLINES: SURF, DOWNWING, WING, KITE AND SUP.
        </p>
        <p className="text-sm lg:text-base leading-relaxed text-gray-300 mast-p2">
          The PCB is integrated directly into the mast. It can be connected to
          virtually any board on the market equipped with the US double-rail
          system.
        </p>
      </div>
    </section>
  );
}