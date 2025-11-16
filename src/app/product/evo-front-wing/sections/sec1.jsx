"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EvoImagesSection() {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;

    if (!section || !left || !right) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom+=150% top", // animation continues into next section
        scrub: true,
      },
    });

    tl.to(left, { xPercent: -25, ease: "power2.out" }, 0)
      .to(right, { xPercent: 25, ease: "power2.out" }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex h-screen w-full flex-col items-center justify-start overflow-hidden bg-black"
    >
      {/* --- Text --- */}
      <div className="z-20 mt-[8vh] flex flex-col items-center text-center px-4">
        <p
          className="text-[16px] font-semibold leading-[20px] text-[rgba(255,255,255,0.8)] tracking-wide"
          style={{ fontFamily: '"alliance no.2", sans-serif' }}
        >
          THE LEGACY OF AFS ADVANCED DEVELOPMENTS COMBINED WITH THE FREEDOM OF REMOVABILITY
        </p>
        <h1
          className="mt-3 text-[70px] font-bold leading-[77px] text-white uppercase"
          style={{ fontFamily: '"alliance no.2", sans-serif' }}
        >
          EVO HA750 & HA1000
        </h1>
      </div>

      {/* --- Images --- */}
      <div className="absolute bottom-[-25vh] left-1/2 z-10 flex -translate-x-1/2 items-end justify-center">
        {/* Left */}
        <div ref={leftRef} className="relative h-[150vh] w-[90vw] -mr-[18vw] z-20">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2025/05/Frame-25-2-scaled.png.webp"
            alt="EVO HA750 Left"
            fill
            className="object-contain object-right scale-[1.4]"
            priority
          />
        </div>

        {/* Right */}
        <div ref={rightRef} className="relative h-[150vh] w-[90vw] -ml-[18vw] z-10">
          <Image
            src="https://afs-foiling.com/wp-content/uploads/2025/05/Frame-25-scaled.png.webp"
            alt="EVO HA1000 Right"
            fill
            className="object-contain object-left scale-[1.4]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
