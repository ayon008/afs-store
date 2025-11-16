import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const UltraLightWingSection = () => {
  const boxRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Set up section transition
    gsap.to(sectionRef.current, {
      backgroundColor: "#1a1a1a",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "bottom center",
        end: "bottom top",
        scrub: 1
      }
    });

    const el = boxRef.current;
    const section = sectionRef.current;
    const img = el.querySelector("img");

    // Wait until the image is fully loaded
    if (img.complete) {
      startZoom();
    } else {
      img.onload = startZoom;
    }

    function startZoom() {
      const scaleX = window.innerWidth / el.offsetWidth;
      const scaleY = window.innerHeight / el.offsetHeight;
      const maxScale = Math.max(scaleX, scaleY);

      // Zoom animation
      gsap.fromTo(
        el,
        { scale: 1, y: "-50%", x: "-50%", transformOrigin: "center center" },
        {
          scale: maxScale,
          y: 0,
          x: "-50%",
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
          ease: "power2.inOut",
        }
      );

      // Fade out smoothly before next section
      gsap.to(el, {
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "bottom-=200 top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#f0f0f0] overflow-hidden"
      style={{ marginBottom: "-1px" }}
    >
      <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between px-4 sm:px-10">
        {/* Left Big Image */}
        <div className="relative w-full lg:w-[65vw] h-[50vh] lg:h-screen flex justify-center items-center">
          <img
            src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-2-1-1-e1705064826702.png.webp"
            alt="Ultra Light Wing"
            className="w-full h-full object-contain lg:object-cover scale-[1.2] lg:scale-[1.9] translate-x-0 lg:translate-x-[-10%] z-0"
          />
        </div>

        {/* Right Text */}
      <div className="w-full lg:w-[40vw] px-4 lg:pl-10 text-left z-10 mt-8 lg:mt-0 lg:-translate-y-70">
        <h2 className='font-["alliance no.2"] text-[32px] lg:text-[50px] font-bold leading-[40px] lg:leading-[88px] text-[#111] mb-6 lg:mb-8'>
          Ultra Light Wing
        </h2>
        <p className='font-["alliance no.2"] text-[20px] font-medium leading-[22px] text-[#111111BF] mb-6'>
          Thanks to its progressive power, navigating with the D-lite is surprisingly easy.
        </p>
        <p className='font-["alliance no.2"] text-[20px] font-normal leading-[22px] text-[rgba(17,17,17,0.75)] mb-6'>
          The rear hand allows you to regulate the power of the wing naturally, giving you the
          confidence to accelerate or decelerate without any fear of “overspeed.”
        </p>
        <p className='font-["alliance no.2"] text-[22px] font-normal leading-[30px] text-[#333]'>
          This gives you considerable power reserves for rapid acceleration when needed.
        </p>
        </div>
      </div>

      {/* Center Box */}
      <div
        ref={boxRef}
        className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center bg-[#1a1a1a] drop-shadow-2xl pointer-events-none"
        style={{ width: "300px", height: "300px" }}
      >
        <img
          src="https://afs-foiling.com/wp-content/uploads/2024/02/afs-d-lite-6-1.png"
          alt="Zoom Box"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
};

export default UltraLightWingSection;
