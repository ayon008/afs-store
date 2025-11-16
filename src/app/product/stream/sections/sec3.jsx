'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const sectionRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bottomText = bottomTextRef.current;

    // Animate text color on scroll
    gsap.to(bottomText, {
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        pin: true,
      },
      color: 'rgb(17,17,17)', // final black
      ease: 'none',
    });
  }, []);

  return (
    <div ref={sectionRef} className="flex h-screen bg-black">
      {/* Left: Image (50%) */}
      <div className="w-1/2 relative overflow-hidden">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/07/pp_blue0005-2.png"
          alt="Stream Wing"
          fill
          className="object-cover bg-transparent animate-float"
        />
      </div>

      {/* Right: Text (50%) */}
      <div className="w-1/2 flex flex-col justify-between p-8 bg-white">
        {/* Top Heading */}
        <div>
          <h1 className="text-[50px] font-bold font-alliance">
            A versatile and <br /> responsive wing
          </h1>
          <p className="mt-4 text-lg text-gray-400 font-alliance">
            Designed to adapt to all styles, the STREAM stays <br /> out of the way when needed, allowing riders to <br /> focus on the purity of the experience, but <br /> responds instantly when called upon.
          </p>
        </div>

        {/* Bottom Text */}
        <div className="relative">
          <p
            ref={bottomTextRef}
            className="text-[32px] font-medium leading-10 text-gray-400 font-alliance"
          >
            The STREAM delivers progressive, perfectly balanced traction that transforms into smooth gliding with excellent acceleration. A high-performance wing that is fast but always controllable, giving every rider confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
