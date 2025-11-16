"use client";

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ConcaveDeckSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const headingDividerRef = useRef(null);
  const textLeftRef = useRef(null);
  const textRightRef = useRef(null);
  const textDividerRef = useRef(null);
  const boardImageRef = useRef(null);
  const svgLineRef = useRef(null);

  // Image URLs
  const boardImageUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/Whitebird-profil-1.webp";
  const dottedLineSvgUrl = "https://afs-foiling.com/wp-content/uploads/2024/03/Vector-2-1.svg";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([
        titleRef.current, 
        headingDividerRef.current,
        textLeftRef.current, 
        textRightRef.current, 
        boardImageRef.current, 
        textDividerRef.current
      ], { autoAlpha: 0, y: 30 });
      gsap.set(svgLineRef.current, { autoAlpha: 0, scale: 0.9, x: -20 });

      const dottedPath = svgLineRef.current ? svgLineRef.current.querySelector('path') : null;
      let pathLength = 0;
      if (dottedPath) {
        pathLength = dottedPath.getTotalLength();
        gsap.set(dottedPath, { 
          strokeDasharray: pathLength, 
          strokeDashoffset: pathLength 
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500', // Faster scroll duration
          pin: true,
          scrub: 0.5,     // Faster scrub delay
          // markers: true,
        },
      });

      // Animation sequence
      tl.to([titleRef.current, headingDividerRef.current], { 
          autoAlpha: 1, 
          y: 0, 
          duration: 1 
        }, 'start')
        .to([textLeftRef.current, textRightRef.current, textDividerRef.current], { 
          autoAlpha: 1, 
          y: 0, 
          duration: 1 
        }, 'start+=0.5')
        .to(boardImageRef.current, { 
          autoAlpha: 1, 
          y: 0, 
          duration: 1.5 
        }, 'start+=1')
        .to(svgLineRef.current, { 
          autoAlpha: 1, 
          scale: 1, 
          x: 0, 
          duration: 1 
        }, 'start+=1.5');
      
      if (dottedPath) {
        tl.to(dottedPath, { 
          strokeDashoffset: 0, 
          duration: 1.5, 
          ease: "power1.inOut" 
        }, '<');
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden flex items-center justify-center"
    >
      <div className="relative w-full h-screen flex flex-col items-center justify-center p-4 md:p-8 lg:p-16">
        
        {/* Main Title - positioned safely below navbar */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 z-20 text-center">
          <h2 ref={titleRef} className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4">
            Concave deck
          </h2>
          {/* Dotted Line under heading */}
          <div ref={headingDividerRef} className="border-b-2 border-dotted border-gray-400 w-full md:w-[600px] mx-auto"></div>
        </div>

        {/* Description Texts & Dotted Line - positioned safely below navbar */}
        <div className="absolute top-[42%] left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center z-20 gap-6 md:gap-8 max-w-5xl px-4">
          
          {/* Left Text */}
          <p ref={textLeftRef} className="text-base md:text-lg text-gray-300 max-w-xs md:max-w-sm text-center md:text-left">
            Precision, level and optimal foil control thanks to a hollow deck that brings you closer to the foil and lowering your center of gravity.
          </p>
          
          {/* Dotted Line Divider between texts */}
          <div ref={textDividerRef}>
            {/* Horizontal line for mobile */}
            <div className="block md:hidden border-b-2 border-dotted border-gray-400 w-24 my-2"></div>
            {/* Vertical line for desktop */}
            <div className="hidden md:block border-l-2 border-dotted border-gray-400 h-20"></div>
          </div>

          {/* Right Text */}
          <p ref={textRightRef} className="text-base md:text-lg text-gray-300 max-w-xs md:max-w-sm text-center md:text-left">
            Combined with a longitudinal and lateral concave, the feeling is direct and precise. The level of control and precision of the foil is therefore at its maximum.
          </p>
        </div>

        {/* Board Image */}
      {/* Board Image */}
<div 
  ref={boardImageRef} 
  className="absolute bottom-[8%] w-[110%] md:w-[95%] lg:w-[85%] max-w-[1600px] z-10"
>
  <img 
    src={boardImageUrl} 
    alt="AFS Whitebird Board Profile" 
    className="w-full h-auto object-contain"
  />
</div>


        {/* Dotted Line SVG Overlay - MOVED DOWN */}
       {/* Dotted Line SVG Overlay */}
<div 
  ref={svgLineRef}
  className="absolute bottom-[30%] md:bottom-[24%] lg:bottom-[28%] w-[75%] md:w-[65%] lg:w-[55%] max-w-[1200px] z-10"
  style={{ left: '37%' }}
>
  <img 
    src={dottedLineSvgUrl} 
    alt="Concave Deck Dotted Line" 
    className="w-full h-auto" 
  />
</div>


      </div>
    </section>
  );
}