"use client";

import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const bannerImageUrl = "https://afs-foiling.com/wp-content/uploads/2025/04/UGlide_0004-1-1536x768.png.webp";

export default function GlideBanner() {
  const mainRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // === 1. Animation for the banner image ===
      // This will fade in and scale down as you scroll past it
      gsap.from(".gsap-image", {
        opacity: 0,
        scale: 1.05,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".gsap-image",
          start: "top 90%", // Start when top of image hits 90% of viewport
          end: "bottom 50%", // End when bottom of image hits 50% of viewport
          scrub: 1, // Smooth scrubbing (number is for smoothing)
          // markers: true,
        }
      });

      // === 2. Animation for the text content ===
      // This will slide up and fade in, tied to the scroll
      gsap.from([".gsap-text-line-1", ".gsap-text-heading", ".gsap-text-paragraph"], {
        opacity: 0,
        y: 60, // Start 60px down
        duration: 1,
        ease: "power2.out",
        stagger: 0.1, // Slight delay between each
        scrollTrigger: {
          trigger: ".gsap-text-section", // Trigger is the text section wrapper
          start: "top 85%", // Start when top of text section hits 85% of viewport
          end: "top 50%", // End when top of text section hits 50% of viewport
          scrub: 1, // Tie animation progress to scroll
          // markers: true,
        }
      });

    }, mainRef); 

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden" ref={mainRef}>
      
      {/* Add a class for GSAP to target */}
      <div className="gsap-image">
        <Image
          src={bannerImageUrl}
          alt="UGlide 41 Carbon Fiber Banner"
          width={1536}
          height={768}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Add a class for GSAP to target */}
      <div className="px-12 py-20 md:px-20 md:py-24 lg:px-28 lg:py-32 gsap-text-section">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-end">
          
          <div className="flex flex-col">
            <p className="text-base font-light tracking-wide gsap-text-line-1">
              Minimal Drag, Maximum Glide.
            </p>
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold mt-4 leading-tight gsap-text-heading">
              Glide 41 – Ultra High Aspect Stabilizer
            </h1>
          </div>

          <div>
            <p className="text-base font-light leading-relaxed mb-1 gsap-text-paragraph">
              Designed for expert Downwind (DW) riders and fans of infinite glide in downwind and wing, the Glide 41 stabilizer embodies the ultimate gliding experience. With an aspect ratio of 13.7 and high-modulus carbon construction, it offers unrivalled gliding sensations, meeting the expectations of the most demanding riders.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}