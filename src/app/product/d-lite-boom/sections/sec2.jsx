'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate clip-path circle reveal
      gsap.fromTo(
        contentRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        {
          clipPath: 'circle(150% at 50% 50%)',
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden"
    >
      {/* Background content that gets revealed */}
      <div
        ref={contentRef}
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: 'circle(0% at 50% 50%)',
          WebkitClipPath: 'circle(0% at 50% 50%)',
        }}
      >
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/01/focus_texture_handle-2.png"
          alt="Boom handle"
          fill
          className="object-cover opacity-80"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />

        <div className="relative z-10 container mx-auto px-8 py-24 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                New model with boom
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                This new range retains the design of our current D-LITE, while
                incorporating an innovative system for clipping an
                interchangeable boom onto several wing sizes.
              </p>
            </div>

            <div className="text-right">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Unique boom
              </h2>
              <p className="text-base md:text-lg text-gray-300 max-w-md ml-auto">
                Compatible with all sizes of wings in the 2025 range, users will
                only need one boom for several sizes. It will be sold separately
                and will not be compatible with the first version of the range.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
