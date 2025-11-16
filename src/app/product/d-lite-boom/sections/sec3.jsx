'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function App() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 }
      );

      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)', delay: 1.3 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="relative h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
      
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2025/01/focus_texture_handle-1.png"
        alt="Handle"
        fill
        className="object-contain object-bottom scale-150 translate-y-20"
        priority
      />
      
      <div ref={textRef} className="absolute top-1/3 left-10 text-white max-w-lg z-10">
        <h1 className="text-6xl font-bold leading-tight">
          Development validated<br />by Pro-Riders
        </h1>
        <p className="mt-6 text-base leading-relaxed opacity-90">
          Designed in collaboration with Axel Gérard (Vice-Champion Surf Freestyle) and Alan Fedit, this version was tested and approved throughout the GWA World Tour 2024, where it demonstrated its performance and reliability.
        </p>
      </div>
      
    </div>
  );
}