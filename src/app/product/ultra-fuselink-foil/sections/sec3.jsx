"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function VideoSection() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(textRef.current, {
        y: -150,
        ease: "none",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex items-end justify-end min-h-[120vh]  text-white overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-center opacity-90"
        src="https://afs-foiling.com/wp-content/uploads/2024/06/Water-Shot-Ultra-1.webm"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay gradient (same as HeroSection) */}
      <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/60 to-transparent" />

      {/* Animated Text */}
      <div
        ref={textRef}
        className="relative z-10 max-w-xl mr-24 md:mr-32 lg:mr-40 mb-20 text-right space-y-4 will-change-transform"
      >
        <h2
          className='font-[700] leading-[55px] text-[50px]'
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            color: "rgb(255,255,255)",
          }}
        >
          Wide use range
        </h2>

        <p
          className='font-[600] leading-[26.4px] text-[22px]'
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            color: "rgb(255,255,255)",
          }}
        >
          Huge range of use thanks to the bump technology on the leading edge,
          which has allowed us to use an ultra-fast profile without penalizing
          the minis.
        </p>
      </div>
    </section>
  );
}
