"use client";

import Image from 'next/image';
import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger"; // <-- 1. Import ScrollTrigger

// 2. Register the plugin
gsap.registerPlugin(ScrollTrigger);

// Image URL for this section
const section2ImageUrl = "https://afs-foiling.com/wp-content/uploads/2025/04/UGlide_0002-1-1-1536x230.png.webp";

export default function Sec2() {
  const main = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 3. Select all the elements to animate
      const elements = [".gsap-heading", ".gsap-image", ".gsap-subheading"];
      
      // 4. Create the scroll-controlled animation
      gsap.from(elements, {
        opacity: 0,
        y: 60, // Start 60px down
        duration: 1,
        ease: "power2.out",
        stagger: 0.1, // Slight delay between each element
        
        // 5. Configure ScrollTrigger
        scrollTrigger: {
          trigger: main.current,  // The animation triggers when "main" (the whole component) enters the view
          start: "top 80%",       // Animation starts when the top of the component is 80% down the viewport
          end: "top 40%",         // Animation is complete when the top is 40% down the viewport
          scrub: 1,               // This is the key: ties animation to scroll. (1 = 1s of smoothing)
          // markers: true,       // Uncomment this to see the start/end markers for debugging
        }
      });

    }, main); // Scope the GSAP context to our main container

    return () => ctx.revert(); // Cleanup function
  }, []);

  return (
    // Add the ref to the main container
    <div className="bg-black text-white font-sans overflow-x-hidden" ref={main}>
      <div className="px-12 py-20 md:px-20 md:py-24 lg:px-28 lg:py-32 flex flex-col items-center">
        
        {/* These class names are targeted by GSAP */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl text-center font-normal leading-tight gsap-heading">
          This stabilizer has been refined to achieve the perfect balance between performance, control, and accessibility.
        </h2>

        <div className="my-20 md:my-28 lg:my-36 w-full max-w-5xl gsap-image">
          <Image
            src={section2ImageUrl}
            alt="UGlide 41 Stabilizer showing AFS and UGlide 41 logos"
            width={1536}
            height={230}
            className="w-full h-auto"
            priority
          />
        </div>

        <h3 className="text-xl md:text-2xl lg:text-3xl text-center font-bold mt-10 gsap-subheading">
          Versatility across multiple foil ranges
        </h3>

      </div>
    </div>
  );
}