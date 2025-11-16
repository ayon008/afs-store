"use client";

import React, { useEffect, useRef, useState } from "react";

const Sec3 = () => {
  const bottomImgRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const parallaxMovement = Math.min(Math.max(-50, scrollY * 0.1 - 50), 50);

  return (
    <div className="min-h-screen bg-black text-white font-['Inter'] flex items-center justify-center p-4 md:p-12">
      <section className="container max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-40 md:gap-40 items-center relative">

        {/* Left Column: Overlapping Images */}
        <div className="relative w-full h-[500px] md:h-[650px] flex items-center justify-center order-1 md:order-1">
          
          <div className="absolute w-[80%] h-[80%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/12/V_face.png.webp"
              alt="Board Footpad Large"
              className="w-full h-full object-cover"
            />
          </div>

          <div
            ref={bottomImgRef}
            style={{
              transform: `translate(10%, -50%) translateY(${parallaxMovement}px)`,
              backgroundColor: "#0d0d0d",
            }}
            className="absolute w-[60%] h-[60%] top-1/2 left-1/2 -translate-y-1/2 z-20 transition-transform duration-75 ease-out"
          >
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/12/H_tail-1-600x600.png.webp"
              alt="Board Footpad Small"
              className="w-full h-full object-cover"
            />
          </div>

        </div>

        {/* Right Column: Text */}
        <div className="text-left py-12 md:py-0 order-2 md:order-2">
          <h1
            className="mb-2"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "50px",
              fontWeight: 700,
              lineHeight: "55px",
              color: "rgb(255, 255, 255)",
            }}
          >
            Offset compatible
          </h1>

          <p
            className="mb-8 uppercase tracking-widest"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "32px",
              fontWeight: 400,
              lineHeight: "33.6px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            THE SHAPE OF THE BOARD <br className="sm:hidden" /> OFFERS A WIDE STANCE WIDTH.
          </p>

          <div className="max-w-md">
            <p
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "21.6px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Thanks to its multiple inserts, you can adjust the position of the straps precisely for customized comfort and control. The most extreme strap position allows you to ride with maximum radicality while still being able to perform airs in the wake of the boat.
            </p>
          </div>
        </div>

      </section>
    </div>
  );
};

export default Sec3;
