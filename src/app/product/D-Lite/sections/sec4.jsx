import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SoftHandlesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // Fade in content
    gsap.fromTo(
      sectionRef.current.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
   <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#1a1a1a] flex justify-end px-4 md:px-10"
      style={{ marginTop: "-1px" }}>
      
      {/* Right Fixed Content */}
      <div
        className="flex flex-col justify-start items-end sticky h-screen w-full md:w-auto"
        style={{ top: "0", right: "5%", maxWidth: "1200px" }}
      >
        {/* Side by Side Image + Text - Desktop */}
        <div className="hidden md:flex w-full items-start gap-10">
          <div className="flex-shrink-0">
            <img
              src="https://afs-foiling.com/wp-content/uploads/2023/11/afs-d-lite-2-1-e1700493847303.png"
              alt="Innovative Inflation System"
              className="w-[400px] h-auto object-contain"
            />
          </div>

          <div className="flex flex-col space-y-4 lg:space-y-6 max-w-full lg:max-w-[400px] text-center lg:text-left">
            <h1 className="font-[alliance-no-2] text-[32px] lg:text-[45px] font-semibold leading-[40px] lg:leading-[55px] text-white">
              Innovative Inflation <br />System
            </h1>

            <p className="font-[alliance-no-2] text-[20px] font-medium text-white/80 leading-[28px]">
              They eliminate any apprehension at every stage of sailing, allowing
              you to explore a multitude of maneuvers with complete peace of mind.
            </p>
            <p className="font-[alliance-no-2] text-[20px] font-medium text-white/80 leading-[28px]">
              A single inflation nozzle, designed to be compatible with most pumps
              on the market. Coupled with a one-pump system that allows you to
              inflate the wing in one go. Its deflation valve allows you to
              deflate the wing and get back to the warmth more quickly during
              winter sessions!
            </p>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden w-full px-4 py-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <img
              src="https://afs-foiling.com/wp-content/uploads/2023/11/afs-d-lite-2-1-e1700493847303.png"
              alt="Innovative Inflation System"
              className="w-[280px] h-auto object-contain"
            />
            
            <h1 className="font-[alliance-no-2] text-[32px] font-semibold leading-[40px] text-white">
              Innovative Inflation System
            </h1>

            <p className="font-[alliance-no-2] text-[16px] font-medium text-white/80 leading-[24px] max-w-[320px]">
              They eliminate any apprehension at every stage of sailing, allowing
              you to explore a multitude of maneuvers with complete peace of mind.
            </p>
          </div>
        </div>

        {/* Soft Handles Section with subtle BG and horizontal scroll */}
        <div className="px-4 md:px-8 py-8 md:py-16 relative bg-[#1a1a1a] shadow-inner rounded-lg mt-8 md:mt-16">
          <h1
            className="font-[alliance-no-2] text-[32px] md:text-[50px] font-semibold leading-[40px] md:leading-[55px] text-white mb-6 md:mb-8 text-center md:text-left"
          >
            Soft Handles for safe, precise riding
          </h1>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <p className="font-[alliance-no-2] text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[24px] text-gray-200 w-full md:w-[400px] text-center md:text-left">
              The soft handles are a real asset,
              offering maximum protection in the event
              of a fall, for both rider and equipment.
              They eliminate any apprehension at every
              stage of sailing, allowing you to explore
              a multitude of maneuvers with complete
              peace of mind.
            </p>

            <p className="font-[alliance-no-2] text-[14px] md:text-[16px] font-normal leading-[20px] md:leading-[24px] text-gray-200 w-full md:w-[400px] text-center md:text-left">
              The ideal position of the front handle
              facilitates not only navigation, but also
              handling of the wing on land and at
              sea. It requires very little effort and
              is naturally self-supporting, opening the
              door to extended freefly sessions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoftHandlesSection;
