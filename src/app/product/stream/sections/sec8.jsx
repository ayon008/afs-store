"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CarbonBoomSection() {
  const sectionRef = useRef(null);
  const redRef = useRef(null);
  const blueRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // GSAP scroll effect for depth illusion
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      })
        .fromTo(
          redRef.current,
          { z: -200, opacity: 0.8, scale: 0.95 },
          { z: 0, opacity: 1, scale: 1, ease: "power2.out" },
          0
        )
        .fromTo(
          blueRef.current,
          { z: 0, opacity: 0.7, scale: 1 },
          { z: -250, opacity: 0.9, scale: 0.9, ease: "power2.out" },
          0
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col lg:flex-row items-center justify-between bg-[#f5f5f5] text-black px-6 lg:px-20 py-28 overflow-hidden relative"
    >
      {/* Left Content */}
      <div className="lg:w-1/2 w-full mb-12 lg:mb-0">
        <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          A direct connection <br />
          thanks to the carbon boom
        </h2>
        <p className="text-lg md:text-xl font-medium leading-relaxed text-gray-800">
          A feeling of{" "}
          <span className="font-extrabold text-black">direct connection</span>{" "}
          with the wing, for{" "}
          <span className="font-extrabold text-black">ultra-precise handling</span>.
          The carbon boom facilitates weight transfer and improves{" "}
          <span className="font-extrabold text-black">
            responsiveness in freestyle
          </span>{" "}
          or aggressive riding.
        </p>
      </div>

      {/* Right Image Stack */}
<div className="relative lg:w-[65%] w-full flex justify-center items-center perspective-[1600px] scale-[1.6] md:scale-[1.8] lg:scale-[2.2]">
  {/* Blue Image (Back Layer) */}
  <div
    ref={blueRef}
    className="absolute -rotate-[12deg] translate-x-24 translate-y-24 opacity-90"
  >
    <Image
      src="https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0002-2-scaled.png"
      alt="Blue carbon boom"
      width={1400}
      height={1000}
      className="rounded-xl object-contain"
      priority
    />
  </div>

  {/* Red Image (Front Layer) */}
  <div ref={redRef} className="relative z-10 rotate-[6deg]">
    <Image
      src="https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0002-3-scaled.png"
      alt="Red carbon boom"
      width={1400}
      height={1000}
      className="rounded-xl object-contain"
      priority
    />
  </div>
</div>

    </section>
  );
}
