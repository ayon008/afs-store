"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const imageRef = useRef(null);
  const textBlockRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
      gsap.set(imageRef.current, { yPercent: 100, opacity: 0 });
      gsap.set(textBlockRef.current, { yPercent: 100, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.4 },
      });

      tl.to(imageRef.current, { yPercent: 0, opacity: 1 }).to(
        textBlockRef.current,
        { yPercent: 0, opacity: 1 },
        "-=1.1"
      );

      // Scroll-triggered fade to black
      gsap.to(sectionRef.current, {
        backgroundColor: "#000000",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, // smooth transition as you scroll
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full bg-[#b8292d] text-white overflow-hidden"
    >
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        {/* IMAGE */}
        <div
          ref={imageRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs md:max-w-sm z-0"
        >
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2024/03/3D-afs-whitebird-3-scaled-1-scaled.png.webp"
            alt="AFS Whitebird Board"
            width={700}
            height={1050}
            priority
            className="object-contain"
          />
        </div>

        {/* TEXT BLOCK */}
        <div
          ref={textBlockRef}
          className="relative flex flex-col items-center text-center px-6 z-10"
          style={{ marginTop: "20vh" }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] opacity-80 mb-5">
            DISCOVER THE WHITEBIRD
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold !leading-tight my-2">
            The Waterman
            <br />
            spirit in one board
          </h1>
          <p className="text-base md:text-lg max-w-md opacity-90 mt-4">
            Your ally for light wind, downwind, sup foil and sup foil downwind
            sessions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
