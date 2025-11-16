"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function FoilSection() {
  const sectionRef = useRef(null);
  const mainTextRef = useRef(null);
  const imageRef = useRef(null);
  const svgRef = useRef(null);
  
  // Refs for the text blocks
  const callout1TextRef = useRef(null);
  const callout2TextRef = useRef(null);
  const callout3TextRef = useRef(null);
  const callout4TextRef = useRef(null);
  
  // --- NEW REF for the concave deck text ---
  const concaveDeckTextRef = useRef(null); 

  // Image URL
  const boardImageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/3D-afs-whitebird-1-1.png.webp";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Get all the animation elements
      const lines = gsap.utils.toArray(svgRef.current.querySelectorAll('.callout-line'));
      const dots = gsap.utils.toArray(svgRef.current.querySelectorAll('.callout-dot'));
      const texts = [
        callout1TextRef.current, 
        callout2TextRef.current, 
        callout3TextRef.current
      ];
      const bottomText = callout4TextRef.current;
      
      // --- Get the new text element ---
      const concaveDeckText = concaveDeckTextRef.current;
      
      // --- SET INITIAL STATES ---
      gsap.set(mainTextRef.current, { autoAlpha: 0, y: 30 });
      
      // --- CHANGED: Set initial scale to 1.8 (increased size) ---
      gsap.set(imageRef.current, { autoAlpha: 0, scale: 1.8 });
      
      lines.forEach(line => {
        const length = line.getTotalLength();
        gsap.set(line, { 
          strokeDasharray: length, 
          strokeDashoffset: length 
        });
      });
      
      gsap.set(dots, { autoAlpha: 0, scale: 0 });
      
      // --- Add new text to the initial set ---
      gsap.set([...texts, bottomText, concaveDeckText], { autoAlpha: 0, y: 20 });

      // --- CREATE PIN & ANIMATION TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=3000',
          pin: true,
          scrub: 1,
          // markers: true,
        },
      });

      // 1. Fade in the main text and board image
      tl.to(mainTextRef.current, { 
        autoAlpha: 1, 
        y: 0, 
        duration: 2 
      }, 'start')
      
      // --- CHANGED: Animate to scale 1.8 (increased size) ---
      .to(imageRef.current, { 
        autoAlpha: 1, 
        scale: 1.8, // Image will fade in at 180% size
        duration: 2 
      }, 'start');

      // 2. Animate in Callout 1 (Top-Left)
      tl.to(lines[0], { strokeDashoffset: 0, duration: 1.5 }, '+=1')
        .to(dots[0], { autoAlpha: 1, scale: 1, duration: 0.5 })
        .to(texts[0], { autoAlpha: 1, y: 0, duration: 1 }, '-=0.5');

      // 3. Animate in Callout 2 (Mid-Left)
      tl.to(lines[1], { strokeDashoffset: 0, duration: 1.5 }, '+=1')
        .to(dots[1], { autoAlpha: 1, scale: 1, duration: 0.5 })
        .to(texts[1], { autoAlpha: 1, y: 0, duration: 1 }, '-=0.5');

      // 4. Animate in Callout 3 (Bottom-Right)
      tl.to(lines[2], { strokeDashoffset: 0, duration: 1.5 }, '+=1')
        .to(dots[2], { autoAlpha: 1, scale: 1, duration: 0.5 })
        .to(texts[2], { autoAlpha: 1, y: 0, duration: 1 }, '-=0.5');

      // 5. Animate in the final bottom text
      tl.to(bottomText, { autoAlpha: 1, y: 0, duration: 1 }, '+=1.5');
      
      // --- 6. NEW ANIMATION: Fade in "Concave deck" text ---
      tl.to(concaveDeckText, { autoAlpha: 1, y: 0, duration: 1 }, '+=1');

    }, sectionRef);

    // Cleanup function
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden"
    >
      <div className="relative w-full h-screen flex items-center justify-center p-4 md:p-8 lg:p-16">
        
        {/* --- NEW TEXT: "Concave deck" - positioned below navbar --- */}
        <div 
          ref={concaveDeckTextRef}
          className="absolute z-20 text-2xl md:text-3xl font-bold"
          // Positioned below navbar with safe top spacing
          style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
        >
          Concave deck
        </div>

        {/* 1. MAIN TITLE & DESCRIPTION - positioned below navbar */}
        <div 
          ref={mainTextRef} 
          className="absolute top-[15%] right-[%] md:right-[10%] z-20"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
            Sup foil & Sup foil
            <br />
            Downwind
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-300 max-w-xs md:max-w-sm">
            This board features a compact shape with moderate width and a taut hull, making it easy to acquire speed for take-off.
          </p>
        </div>

        {/* 2. BOARD IMAGE - Container */}
        <div ref={imageRef} className="absolute top-0 left-0 w-full h-full z-10 flex items-center justify-center">
          <img 
            src={boardImageUrl} 
            alt="AFS Whitebird Foil Board" 
            className="w-full h-full object-contain"
            // --- CHANGED: Removed the inline style prop ---
          />
        </div>

        {/* 3. CALLOUTS - SVG for lines and dots */}
        <svg 
          ref={svgRef}
          className="absolute inset-0 w-full h-full z-10" 
          viewBox="0 0 1000 1000" 
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Line 1: Top-Left - COORDINATES ADJUSTED */}
          <line 
            className="callout-line"
            x1="220" y1="280" x2="380" y2="340" 
            stroke="white" strokeWidth="1" 
          />
          <circle className="callout-dot" cx="380" cy="340" r="4" fill="#E63946" />

          {/* Line 2: Mid-Left - COORDINATES ADJUSTED */}
          <line 
            className="callout-line"
            x1="250" y1="530" x2="420" y2="530" 
            stroke="white" strokeWidth="1" 
          />
          <circle className="callout-dot" cx="420" cy="530" r="4" fill="#E63946" />

          {/* Line 3: Bottom-Right - COORDINATES ADJUSTED */}
          <line 
            className="callout-line"
            x1="880" y1="800" x2="680" y2="730" 
            stroke="white" strokeWidth="1" 
          />
          <circle className="callout-dot" cx="680" cy="730" r="4" fill="#E63946" />
        </svg>

        {/* 4. CALLOUTS - HTML Text Blocks */}
        
        {/* Callout 1 Text (Top-Left) - positioned safely below navbar */}
        <div 
          ref={callout1TextRef}
          className="absolute z-20 max-w-[300px] text-xs md:text-sm"
          style={{ top: '28%', left: '10%' }}
        >
          THE SOFTNESS OF THE RAILS AND ADVANCED HULL SHAPE BRINGS FORGIVENESS TO TOUCH DOWNS WITH A SMOOTH, IMMEDIATE REBOUND.
        </div>

        {/* Callout 2 Text (Mid-Left) - POSITION ADJUSTED */}
        <div 
          ref={callout2TextRef}
          className="absolute z-20 max-w-[300px] text-xs md:text-sm"
          style={{ top: '50%', left: '12%' }}
        >
          THE SOFTNESS OF THE RAILS AND ADVANCED HULL SHAPE BRINGS FORGIVENESS TO TOUCH DOWNS WITH A SMOOTH, IMMEDIATE REBOUND.
        </div>

        {/* Callout 3 Text (Bottom-Right) - POSITION ADJUSTED */}
        <div 
          ref={callout3TextRef}
          className="absolute z-20 max-w-[220px] text-xs md:text-sm text-right"
          style={{ top: '78%', right: '10%' }}
        >
          THE REDUCTION OF THE WETTED SURFACE VIA THE T TAIL FINISH PROVIDES EVEN MORE GLIDE.
        </div>

        {/* Callout 4 Text (Bottom-Center) */}
        <div 
        ref={callout4TextRef}
        className="absolute z-20 max-w-[300px] text-xs md:text-sm text-center"
        style={{ bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}
        >
        BY COMBINING THESE FEATURES, THE WHITEBIRD OFFERS INCREASED STABILITY FOR SUP FOIL SAILORS.
        </div>
      </div>
    </section>
  ); 
}