"use client";

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DownwindScrollSection() {
  const sectionRef = useRef(null);
  const boardFrontRef = useRef(null);
  const boardBackRef = useRef(null);
  const ann1Ref = useRef(null);
  const ann2Ref = useRef(null);
  const textBlockRef = useRef(null);

  const boardFront =
    "https://afs-foiling.com/wp-content/uploads/2024/03/3D-afs-whitebird-3-scaled-1-scaled.png.webp";
  const boardBack =
    "https://afs-foiling.com/wp-content/uploads/2024/03/3D-afs-whitebird-2-3.png.webp";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: true,
          pin: true,
        },
      });

      // --- Base parallax animation for boards ---
      tl.to(boardFrontRef.current, { xPercent: -10, ease: "none" }, 0)
        .to(boardBackRef.current, { xPercent: 10, ease: "none" }, 0);

      // --- Animate main text block in ---
      tl.fromTo(
        textBlockRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        0.2
      );

      // --- Animate Annotation 1 ---
      tl.fromTo(
        ann1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        0.5
      )
        .fromTo(
          ann1Ref.current.querySelector(".dot"),
          { scale: 0 },
          { scale: 1, duration: 0.2, ease: "back.out(2)" },
          0.55
        )
        .fromTo(
          ann1Ref.current.querySelector(".dashed"),
          { strokeDashoffset: 180 },
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
          0.6
        )
        .fromTo(
          ann1Ref.current.querySelector(".atext"),
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          0.9
        );

      // --- Animate Annotation 2 ---
      tl.fromTo(
        ann2Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
        1.0
      )
        .fromTo(
          ann2Ref.current.querySelector(".dot"),
          { scale: 0 },
          { scale: 1, duration: 0.2, ease: "back.out(2)" },
          1.1
        )
        .fromTo(
          ann2Ref.current.querySelector(".dashed"),
          { strokeDashoffset: 180 },
          { strokeDashoffset: 0, duration: 0.8, ease: "power2.out" },
          1.15
        )
        .fromTo(
          ann2Ref.current.querySelector(".atext"),
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" },
          1.45
        );
    });

    return () => ctx.revert();
  }, []);

  // --- Annotation Block ---
  const Annotation = React.forwardRef(({ text, className }, ref) => (
    <div ref={ref} className={`absolute opacity-0 ${className}`}>
      <div className="flex items-center">
        {/* Dot */}
        <svg width="14" height="14" className="dot flex-shrink-0">
          <circle cx="7" cy="7" r="6" fill="white" />
        </svg>

        {/* Dashed Line */}
        <svg width="180" height="2" className="mx-3 flex-shrink-0">
          <path
            className="dashed"
            d="M 0 1 L 180 1"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="6 6"
            strokeDashoffset="180"
            fill="none"
          />
        </svg>

        {/* Text */}
        <p className="atext max-w-[260px] text-xs text-gray-300 opacity-0 md:text-sm lg:text-base leading-snug">
          {text}
        </p>
      </div>
    </div>
  ));
  Annotation.displayName = "Annotation";

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black text-white"
    >
      <div className="sticky top-0 h-screen w-full">
        {/* LEFT TEXT BLOCK */}
        <div
          ref={textBlockRef}
          className="absolute left-[8vw] top-[25%] max-w-sm opacity-0"
        >
          <h2 className="text-3xl font-bold md:text-5xl lg:text-6xl">
            Downwind compact
          </h2>
          <p className="mt-4 text-sm text-gray-300 md:text-base lg:text-lg">
            Its compact, accessible shape makes it an easy freeride downwind
            board with excellent stability.
          </p>
        </div>

        {/* BOARDS CENTERED */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            ref={boardBackRef}
            src={boardBack}
            alt="Board back"
            className="absolute left-[8%] top-1/2 z-0 h-[70vh] -translate-y-1/2 opacity-90"
          />
          <img
            ref={boardFrontRef}
            src={boardFront}
            alt="Board front"
            className="relative z-10 h-[70vh]"
          />
        </div>

        {/* RIGHT ANNOTATION 1 */}
        <Annotation
          ref={ann1Ref}
          className="right-[10vw] top-[42%]"
          text="ITS WIDTH OPTIMIZES THE RIDE OFF SET, OFFERING GOOD MANEUVERABILITY AND TURNABILITY."
        />

        {/* RIGHT ANNOTATION 2 */}
        <Annotation
          ref={ann2Ref}
          className="right-[10vw] top-[63%]"
          text="THE SOFTNESS OF THE RAILS AND ADVANCED HULL SHAPE BRINGS FORGIVENESS TO TOUCH DOWNS WITH A SMOOTH, IMMEDIATE REBOUND."
        />
      </div>
    </section>
  );
}
