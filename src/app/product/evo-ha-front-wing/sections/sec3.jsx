"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HugeImageBackgroundTransition() {
  const containerRef = useRef(null);
  const imageSectionRef = useRef(null);
  const textSectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --- Keep Section 1 pinned (so it stays as background) ---
      ScrollTrigger.create({
        trigger: imageSectionRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // --- Fade the image slightly as Section 2 enters ---
      gsap.to(imageRef.current, {
        opacity: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: textSectionRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-black">
      {/* --- Section 1: Hero Image --- */}
      <section
        ref={imageSectionRef}
        className="relative flex h-screen w-full items-center justify-center"
      >
        <Image
          ref={imageRef}
          src="https://afs-foiling.com/wp-content/uploads/2025/05/HA750_0004-1.png.webp"
          alt="HA750 Foil"
          width={1600}
          height={1000}
          className="object-contain w-[80vw] h-auto max-w-none scale-110 transition-all duration-700"
          priority
        />
      </section>

      {/* --- Section 2: Text Content (blurred backdrop) --- */}
      <section
        ref={textSectionRef}
        className="relative z-20 flex min-h-screen flex-col justify-center px-12 md:px-32
                   backdrop-blur-[12px] bg-black/40"
      >
        <h2
          className="mb-6 font-[700]"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "50px",
            lineHeight: "55px",
            color: "rgb(255,255,255)",
          }}
        >
          Offer removable “High Aspect”
        </h2>

        <p
          className="mb-16 font-[400]"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "90px",
            lineHeight: "90px",
            color: "rgba(255,255,255,0.8)",
          }}
        >
          Until now, tackling the pure glide of a high-ratio foil often meant
          making a choice: that of a monobloc fuselage. With the EVO HA750 and
          HA1000, those days are over.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "26px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Thanks to the EVO interface—proven, robust, and intuitive—you get a
            foil that is removable, transportable, and upgradeable... while
            maintaining an exceptional glide/stability ratio. They give
            intermediate riders great accessibility on low beaches.
          </p>

          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "32px",
              fontWeight: "500",
              lineHeight: "33.6px",
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Featuring Advanced AFS technology in a collapsible format, sharpened
            and ready for any session.
          </p>
        </div>
      </section>
    </div>
  );
}
