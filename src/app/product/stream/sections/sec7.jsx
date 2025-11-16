'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ClonedSections() {
  const section1Ref = useRef(null);
  const textRefs = useRef([]);
  textRefs.current = [];

  const addToRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  useEffect(() => {
    // Animate each text block in section 1
    textRefs.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.8, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );
    });

    // Optional: subtle parallax effect on images
    gsap.to('.left-image', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });

    gsap.to('.right-image', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: section1Ref.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="relative bg-white overflow-hidden" ref={section1Ref}>
      {/* First section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center max-w-3xl px-6 py-10 relative">
          {/* Heading stays normal */}
          <h2 className="text-2xl font-bold mb-4 text-black" ref={addToRefs}>
            An ultra-light tail for unrestricted freefly
          </h2>

          {/* Frosted glass box behind the content */}
          <div className="absolute inset-0 bg-black/0 backdrop-blur-lg border border-black/10 -z-10"></div>

          {/* Paragraph with custom font */}
          <p
            className="mb-6 relative z-10"
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '28px',
              fontWeight: 500,
              lineHeight: '35px',
              color: 'rgba(17, 17, 17, 0.75)',
            }}
            ref={addToRefs}
          >
            The rear of the wing has been refined to the extreme: the canopy is made of lightweight ripstop PE, with differentiated weight to optimize the tension of the wing.
          </p>

          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            {/* Info boxes with same font styles */}
            <div
              className="bg-black/0 backdrop-blur-sm px-6 py-4 text-sm max-w-xs"
              style={{
                fontFamily: '"Alliance No.2", sans-serif',
                fontSize: '28px',
                fontWeight: 500,
                lineHeight: '35px',
                color: 'rgba(17, 17, 17, 0.75)',
              }}
              ref={addToRefs}
            >
              This ultra-lightweight fabric feels light in your hands, for a natural and precise feel when surfing.
            </div>
            <div
              className="bg-black/0 backdrop-blur-sm px-6 py-4 text-sm max-w-xs"
              style={{
                fontFamily: '"Alliance No.2", sans-serif',
                fontSize: '28px',
                fontWeight: 500,
                lineHeight: '35px',
                color: 'rgba(17, 17, 17, 0.75)',
              }}
              ref={addToRefs}
            >
              Controlled tension - responsive yet smooth wing, capable of reacting instantly without jerking. Ideal for wave maneuvers.
            </div>
          </div>
        </div>
      </div>

      {/* Second section */}
      <div className="relative h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl px-4">
          <p className="text-lg font-medium mb-4" ref={addToRefs}>
            This combination of rigid and flexible materials creates a natural twist in the profile under load.
          </p>
          <p className="mb-4" ref={addToRefs}>
            This twist absorbs excess power, resulting in a wing:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-4" ref={addToRefs}>
            <div className="bg-black text-white px-6 py-2 uppercase font-bold text-sm">
              More tolerant
            </div>
            <div className="bg-black text-white px-6 py-2 uppercase font-bold text-sm">
              Comfortable to sail
            </div>
            <div className="bg-black text-white px-6 py-2 uppercase font-bold text-sm">
              Even under irregular conditions.
            </div>
          </div>
          <p className="text-sm" ref={addToRefs}>
            At full speed, the twist locks for better directional stability, high-speed.
          </p>
        </div>
      </div>

      {/* Left image spanning both sections, half off-screen */}
      <div className="absolute top-0 left-0 h-[200vh] w-[100vw] overflow-hidden z-0 left-image">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/07/pp_red0004-1-scaled.png.webp"
          alt="Left side image"
          fill
          className="object-contain -translate-x-1/2"
        />
      </div>

      {/* Right image spanning both sections, half off-screen */}
      <div className="absolute top-0 right-0 h-[200vh] w-[100vw] overflow-hidden z-0 right-image">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2025/09/pp_red0003-12.png.webp"
          alt="Right side image"
          fill
          className="object-contain translate-x-1/2"
        />
      </div>
    </div>
  );
}
