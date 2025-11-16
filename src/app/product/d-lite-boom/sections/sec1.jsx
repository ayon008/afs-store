'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function DLiteBoom() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Move image from bottom-right to center
      gsap.fromTo(imageRef.current,
        { x: '50vw', y: '100vh', opacity: 0 },
        {
          x: '0vw', y: '0vh',
          opacity: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom center',
            scrub: 1,
          }
        }
      );

      // Keep image centered at end of section 2
      gsap.to(imageRef.current, {
        xPercent: -50,
        yPercent: -50,
        top: '50%',
        left: '50%',
        position: 'fixed',
        ease: 'power3.out',
        scrollTrigger: {
          trigger: text2Ref.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        },
      });

      // Text fade-ins (unchanged)
      gsap.fromTo(text1Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: text1Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(text2Ref.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1,
          scrollTrigger: {
            trigger: text2Ref.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      gsap.fromTo(text3Ref.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 1.2,
          scrollTrigger: {
            trigger: text3Ref.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Section 1 */}
      <section className="h-screen flex items-center justify-start px-20">
        <div ref={text1Ref} className="max-w-2xl text-white">
          <h1 className="text-9xl font-bold leading-tight">
            Get more<br />delighted
          </h1>
          <p className="mt-8 text-sm uppercase tracking-widest opacity-80">
            We're delighted to announce the launch of a new version of the AFS D-LITE wing,<br />
            specially developed to meet the growing demand for boom wings.
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="h-screen flex items-center justify-end relative">
        <div
          ref={imageRef}
          className="fixed bottom-0 right-0 w-1/2 h-1/2 flex items-end justify-end pointer-events-none"
        >
         <Image
  src="https://afs-foiling.com/wp-content/uploads/2025/01/Group-1-1.png.webp"
  alt="D-Lite Boom"
  width={1600} // increased from 1200
  height={1200} // increased from 900
  className="object-contain drop-shadow-2xl scale-125"
  priority
/>

        </div>
        <div ref={text2Ref} className="w-1/2 h-full"></div>
      </section>

      {/* Section 3 */}
      <section className="h-screen flex items-center justify-center relative">
        <div ref={text3Ref} className="relative z-10 text-center text-white max-w-4xl">
          <h2 className="text-7xl font-bold leading-tight">
            What you need to know<br />
            about the D-Lite Boom
          </h2>
        </div>
      </section>
    </div>
  );
}
