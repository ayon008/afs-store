"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RollPitchSection() {
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text sections
      textRefs.current.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "bottom 30%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Animate image (subtle upward move + fade in)
      gsap.fromTo(
        imageRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black text-white relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6 md:px-20 py-16"
    >
      {/* Top Text */}
      <div
        ref={(el) => (textRefs.current[0] = el)}
        className="text-center md:text-left max-w-4xl w-full mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[alliance-no2]">
          Roll control
        </h2>
        <div className="border-t border-gray-600 w-full mb-4"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed font-medium text-gray-300">
          <p>
            On the short fuselink, the mast is moved 25 mm closer to the wing
            to increase roll maneuverability.
          </p>
          <p>
            It is particularly suitable for use with wings with a wingspan of
            more than one meter.
          </p>
        </div>
      </div>

      {/* Image */}
      <div
        ref={imageRef}
        className="relative w-full flex justify-center mb-12"
      >
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/08/image-1-13.png.webp"
          alt="Fuselink"
          width={1200}
          height={400}
          className="object-contain w-[80%] md:w-[70%] lg:w-[60%]"
        />
      </div>

      {/* Bottom Text */}
      <div
        ref={(el) => (textRefs.current[1] = el)}
        className="text-center md:text-left max-w-4xl w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 font-[alliance-no2]">
          Pitch response
        </h2>
        <div className="border-t border-gray-600 w-full mb-4"></div>

        <p className="text-sm leading-relaxed font-medium text-gray-300 max-w-2xl">
          The wing and stabilizer spacing is reduced by 30 mm or 60 mm (2
          stabilizer positions) compared to the standard Fuselink, allowing for
          a higher pumping cadence or more pop for jumping.
        </p>
      </div>
    </section>
  );
}
