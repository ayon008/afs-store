// components/HeroSection.jsx
import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const textTopRef = useRef(null);
  const textBehindRef = useRef(null);
  const imageContainerRef = useRef(null);

  const imageUrl =
    "https://afs-foiling.com/wp-content/uploads/2023/06/1M7A0562-%D0%A3%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%BE-NR-2.png";

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Image starts below (yPercent 50), will animate up to 0 (from bottom)
      gsap.set(imageContainerRef.current, { yPercent: 50, opacity: 0 });
      // Both text blocks start slightly lower and invisible
      gsap.set([textTopRef.current, textBehindRef.current], { opacity: 0, y: 30 });

      const tl = gsap.timeline({ defaults: { duration: 1.2, ease: "power3.out" } });

      // show the top text first (already at top)
      tl.to(textTopRef.current, { opacity: 1, y: 0, duration: 0.9 })
        // bring image up from bottom (note: image container is pushed down via top-12)
        .to(
          imageContainerRef.current,
          { yPercent: 0, opacity: 1, duration: 1.5 },
          "-=0.25"
        )
        // reveal the behind text (it remains behind the image due to z-index)
        .to(textBehindRef.current, { opacity: 1, y: 0 }, "-=1");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex justify-center items-start min-h-screen bg-white pt-24 pb-12 overflow-hidden"
    >
      {/* Image container: pushed slightly down with top-12 */}
      <div
        ref={imageContainerRef}
        className="absolute top-12 left-0 w-full h-[calc(100vh-3rem)] pointer-events-none z-10 overflow-hidden"
      >
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={imageUrl}
            alt="Surfboard close-up"
            layout="fill"
            objectFit="cover"
            priority
            className="select-none"
          />
        </div>
      </div>

      {/* Top text placed at the top side (absolute) and above image */}
      <div
        ref={textTopRef}
        className="absolute top-6 left-0 right-0 z-20 w-full max-w-4xl px-4 mx-auto text-center"
      >
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight">
          <span className="text-[#00528b]">Accessibility and performance</span>
          <span className="text-black"> for</span>
        </h1>
      </div>

      {/* Text behind the image (kept centered but behind due to z-0) */}
      <div
        ref={textBehindRef}
        className="absolute inset-0 flex flex-col justify-center items-center z-0 px-4 text-center overflow-hidden"
      >
        <div className="relative w-full max-w-4xl mt-80 md:mt-[28rem] lg:mt-[32rem]">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight">
            <span className="text-black block mt-2 sm:mt-4">
              classic, efficient surfing.
            </span>
          </h1>

          <p className="mt-10 sm:mt-12 text-lg sm:text-xl font-medium text-gray-700 max-w-xl mx-auto leading-relaxed">
            AFS has benefited from the experience of the <strong>Nahskwell brand</strong> to design
            and produce its own range of SUPs – reliable, modern shapes proven over many years.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
