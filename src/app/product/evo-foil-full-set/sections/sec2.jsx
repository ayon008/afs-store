"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FoilConnection() {
  const screwsRef = useRef([]);

  useEffect(() => {
    screwsRef.current.forEach((screw) => {
      gsap.fromTo(
        screw,
        { rotate: 0 },
        {
          rotate: 360,
          ease: "none",
          scrollTrigger: {
            trigger: screw,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <section className="relative w-full bg-black text-white py-24 flex flex-col items-center justify-center overflow-hidden">
      {/* Text Content */}
      <div className="text-center z-10 px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          New Front Foil <br /> Connection
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          The Evo range benefits from a new front fender connection. This
          optimizes fluid flow around the zone. Fastening with 3 M8 screws also
          provides rigidity and strength.
        </p>
      </div>

      {/* Foil Image */}
      <div className="relative w-full flex justify-center mt-12">
        <div className="relative w-[90%] max-w-[1600px]">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2024/02/EVO_Top_1450-1-1-2.png.webp"
            alt="Foil"
            width={1600}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />

          {/* Screw Stack */}
          <div className="absolute top-[61%] left-[50.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center space-y-[42px] md:space-y-[48px]">
            {/* 1️⃣ First Screw */}
            <div
              ref={(el) => (screwsRef.current[0] = el)}
              className="relative left-[-1.5px] top-[3.5px]"
            >
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2024/02/screw-1.webp"
                alt="Screw 1"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            {/* 2️⃣ Second Screw */}
            <div ref={(el) => (screwsRef.current[1] = el)}>
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2024/02/screw-1.webp"
                alt="Screw 2"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>

            {/* 3️⃣ Third Screw */}
            <div
              ref={(el) => (screwsRef.current[2] = el)}
              className="relative top-[-14px]"
            >
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2024/02/screw-1.webp"
                alt="Screw 3"
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40 pointer-events-none"></div>
    </section>
  );
}
