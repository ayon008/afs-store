"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const RiderSection = () => {
  const cardsRef = useRef([]);
  const sectionRef = useRef(null);

  const quotes = [
    "When I tested the first PURE 600 proto, I instantly felt faster... but more than that, I trusted it in my tricks.",
    "In competition, this foil keeps my speed alive after the moves. I don’t lose the flow – I can link combos together.",
    "It’s the foil that took me to the next level. Now, I know I can battle with the best.",
    "I’m stoked it’s available for everyone. It’s not just a pro foil – it’s a foil that helps you progress.",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardsRef.current, { opacity: 0, y: 50 });

      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom bottom", // triggers when section bottom hits viewport bottom
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#e5e5e5] flex flex-col justify-center overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 z-10">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black">
          Rider&apos;s word – <br /> Axel Gérard
        </h2>
      </div>

      {/* Rider Image */}
      <div className="flex justify-center items-center w-full mt-12 relative">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/09/IMG_4119-2.png"
          alt="Axel Gérard"
          width={1000}
          height={1000}
          className="object-contain w-auto h-[70vh] lg:h-[80vh] select-none"
          priority
        />
      </div>

      {/* Quote Cards */}
      <div className="flex flex-wrap justify-center gap-6 px-4 py-12 lg:pb-20 z-10">
        {quotes.map((quote, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="bg-gray-600 text-white p-6 rounded-md w-[90%] sm:w-[45%] lg:w-[22%] font-medium tracking-tight leading-snug shadow-md"
          >
            <span className="text-4xl text-gray-300 leading-none">“</span>
            <p className="text-[15px] mt-2">{quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RiderSection;
