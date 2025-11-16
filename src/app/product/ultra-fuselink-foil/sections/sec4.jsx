"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MonoblocSection() {
  const sectionRef = useRef(null);
  const topWingRef = useRef(null);
  const bottomWingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 60%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        topWingRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        0
      ).fromTo(
        bottomWingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-black text-white overflow-hidden h-screen flex flex-col items-center justify-center"
    >
      {/* Top Wing */}
      <div
        ref={topWingRef}
        className="relative w-full flex justify-center -mb-64 md:-mb-80 scale-[1.1]"
      >
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/06/Mask-group-3.png"
          alt="Top Wing"
          width={2000}
          height={1200}
          className="object-contain w-full max-w-[1800px] mx-auto z-10 pointer-events-none select-none"
          priority
        />
      </div>

      {/* Text Content */}
      <div className="relative z-20 text-center px-6 md:px-20 -mt-40 md:-mt-52">
        <h2 className="text-4xl md:text-5xl font-bold mb-3">
          Monobloc structure
        </h2>
        <div className="max-w-3xl mx-auto border-t border-blue-500 pt-3 text-gray-300 text-base md:text-lg space-y-4">
          <p className="leading-relaxed font-semibold text-gray-200">
            The wings are molded directly onto the fuselage in a single process,
            allowing for continuity of the structural carbon fibers while
            maintaining perfect hydrodynamic flow to maximize glide.
          </p>
          <p className="leading-relaxed font-semibold text-gray-200">
            This process provides the rigidity necessary for perfect power
            transmission, unparalleled control, and ultra-precise foil steering
            for ever-increasing performance.
          </p>
        </div>
      </div>

      {/* Bottom Wing */}
      <div
        ref={bottomWingRef}
        className="relative w-full flex justify-center -mt-64 md:-mt-80 scale-[1.1]"
      >
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/06/Mask-group-4.png"
          alt="Bottom Wing"
          width={2000}
          height={1200}
          className="object-contain w-full max-w-[1800px] mx-auto z-10 pointer-events-none select-none"
          priority
        />
      </div>
    </section>
  );
}
