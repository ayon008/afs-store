"use client";
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const shortPoleUrl =
  "https://afs-foiling.com/wp-content/uploads/2024/08/image-2-12.png.webp";
const standardPoleUrl =
  "https://afs-foiling.com/wp-content/uploads/2024/08/image-2-12.png.webp";

export default function Home() {
  const pinnedContainerRef = useRef(null);
  const shortPoleRef = useRef(null);
  const standardPoleRef = useRef(null);
  const shortPoleTextRef = useRef(null);
  const standardPoleTextRef = useRef(null);
  const textLayerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Start images lower and centered
      gsap.set(shortPoleRef.current, { y: "30vh" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinnedContainerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=4000",
        },
      });

      // Intro text fade delay
      tl.to({}, { duration: 1.2 });

      // Fade out text
      tl.to(textLayerRef.current, { opacity: 0, ease: "power1.inOut" });

      // Animate short pole into center
      tl.to(shortPoleRef.current, {
        y: "0vh",
        x: "-8vw",
        ease: "power2.inOut",
      });

      // Bring in standard pole
      tl.to(
        standardPoleRef.current,
        {
          opacity: 1,
          x: "8vw",
          ease: "power2.inOut",
        },
        ">0.3"
      );

      // Fade in text labels
      tl.to(
        [shortPoleTextRef.current, standardPoleTextRef.current],
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "power1.inOut",
        },
        "<"
      );
    }, pinnedContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-[450vh] w-full bg-black text-white">
      {/* Sticky Scroll Container */}
      <div
        ref={pinnedContainerRef}
        className="relative flex h-screen w-full items-center justify-center overflow-visible"
      >
        {/* === Poles Layer === */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* Short Pole */}
          <div ref={shortPoleRef} className="relative flex justify-center">
            <img
              src={shortPoleUrl}
              alt="Short Fuselink"
              className="h-[110vh] w-auto object-contain"
            />
            <h3
              ref={shortPoleTextRef}
              className="absolute -bottom-16 text-center text-2xl font-bold uppercase text-white opacity-0"
            >
              Short
              <br />
              Fuselink
            </h3>
          </div>

          {/* Standard Pole */}
          <div
            ref={standardPoleRef}
            className="absolute flex justify-center opacity-0"
          >
            <img
              src={standardPoleUrl}
              alt="Fuselink Standard"
              className="h-[110vh] w-auto object-contain"
            />
            <h3
              ref={standardPoleTextRef}
              className="absolute -bottom-16 text-center text-2xl font-bold uppercase text-white opacity-0"
            >
              Fuselink
              <br />
              Standard
            </h3>
          </div>
        </div>

        {/* === Text Layer === */}
        <div
          ref={textLayerRef}
          className="absolute inset-0 z-20 mx-auto w-full px-8"
        >
          <div className="flex h-full w-full flex-col justify-end pb-[10vh] space-y-12 text-left">
            <h1 className="text-5xl font-extrabold leading-tight lg:text-7xl">
              <span className="text-blue-500">
                Two sizes of Fuselink fuselage{" "}
              </span>
              <span>allow you to customize your riding style.</span>
            </h1>
            <div className="flex justify-end">
              <p className="max-w-md text-base text-gray-300 lg:text-lg">
                This new fuselage, replacing the Performer range, retains a
                degree of smoothness and accessibility that is essential for
                your progress, while pushing the boundaries of speed and
                stability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Extra scroll space */}
      <div className="h-screen w-full" />
    </main>
  );
}
