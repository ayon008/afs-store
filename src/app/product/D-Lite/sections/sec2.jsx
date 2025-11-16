import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NarrowSpanSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { scale: 1 }, // default size
      {
        scale: 1.2, // zoom in on scroll
        ease: "power2.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden -mt-[20vh] py-16 sm:py-28 bg-[#f0f0f0]">
      {/* Text Above Image */}
      <div className="text-center z-20 w-[90%] sm:w-[80%] max-w-[800px] mb-6 sm:mb-10 min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center items-center mx-auto px-4 py-6 sm:py-10">
        <h1 className="font-[alliance no.2] text-[32px] sm:text-[50px] font-bold leading-[40px] sm:leading-[55px] text-[#111111] mb-6 sm:mb-8 mt-[-10px]">
          Narrow Span
        </h1>

        <p className="font-[alliance no.2] text-[16px] sm:text-[20px] font-medium leading-[26px] sm:leading-[32px] text-[rgba(17,17,17,0.75)] mb-4 sm:mb-6">
          The D-lite's design is remarkably 
          compact, allowing you to
          concentrate fully on your
          navigation without your wing
          rubbing in the water.
        </p>

        <p className="font-[alliance no.2] text-[14px] sm:text-[18px] font-normal leading-[22px] sm:leading-[28px] text-[rgba(17,17,17,0.75)] px-4">
          This exceptional feature makes every phase
          of flight and take-off completely instinctive.
        </p>
      </div>

      {/* Main Image (Scroll Zoom) */}
      <img
        ref={imageRef}
        src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-8-1-1-1-scaled.png.webp"
        alt="D-lite Design"
        className="w-[65%] h-auto object-contain z-10 mb-20 md:w-[85%]"
      />

      {/* Text After Image */}
      <div className="text-center z-20 w-[80%] max-w-[800px] mx-auto min-h-[70vh] flex flex-col justify-center items-center px-4 py-10">
        <h2 className="font-[alliance no.2] text-[50px] font-bold leading-[55px] text-[#111111] mb-8 md:text-[50px] md:leading-[55px]">
          Ultra Light Wing
        </h2>
        <p className="font-[alliance no.2] text-[20px] font-medium leading-[32px] text-[rgba(17,17,17,0.75)] mb-6 md:text-[18px] md:leading-[26px]">
          The lightness of the D-lite offers exceptional
          <br />
          maneuverability, while its balance allows you to perform maneuvers
          without the slightest fatigue.
        </p>
        <p className="font-[alliance no.2] text-[16px] font-normal leading-[26px] text-[#333333] md:text-[15px] md:leading-[22px]">
          You can indulge in hours of sailing to master your jibes and tacks,
          ensuring intense pleasure.
        </p>
      </div>
    </section>
  );
};

export default NarrowSpanSection;
