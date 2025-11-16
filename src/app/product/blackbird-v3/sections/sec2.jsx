'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const DesignInnovantSection = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const images = imagesRef.current;

    // Rotate out images one by one (except the last)
    images.slice(0, -1).forEach((img, i) => {
      gsap.to(img, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `${i * 25}% center`,
          end: `${(i + 1) * 25}% center`,
          scrub: true,
        },
        rotate: 25,
        y: 100,
        scale: 0.9,
        opacity: 0.5,
        delay: i * 0.2,
        duration: 1.8,
        ease: 'power2.out',
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const imageUrls = [
    'https://afs-foiling.com/wp-content/uploads/2024/10/DSC07110@2x-1.png.webp',
    'https://afs-foiling.com/wp-content/uploads/2024/10/DSC07544-1.png.webp',
    'https://afs-foiling.com/wp-content/uploads/2024/10/DSC07550.png.webp',
    'https://afs-foiling.com/wp-content/uploads/2024/10/DSC07209.png',
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[180vh] bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Top-left text */}
      <div className="absolute top-16 left-10 max-w-[700px] z-20">
        <h2
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: '50px',
            fontWeight: 700,
            lineHeight: '55px',
            color: '#ffffff',
          }}
        >
          Design Innovant
        </h2>
        <p
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: '42px',
            fontWeight: 500,
            lineHeight: '42px',
            color: '#ffffff',
            marginTop: '20px',
          }}
        >
          Its visionary design once again pushes the boundaries of aerodynamics
          and hydrodynamics.
        </p>
      </div>

      {/* Center stacked, slightly tilted images */}
      <div className="relative flex items-center justify-center w-full h-full mt-40">
        {imageUrls.map((url, i) => (
          <img
            key={i}
            ref={(el) => (imagesRef.current[i] = el)}
            src={url}
            alt={`Design image ${i + 1}`}
            className="absolute object-contain max-h-[90vh] transition-transform duration-700"
            style={{
              zIndex: i === imageUrls.length - 1 ? 0 : imageUrls.length - i,
              transform: `rotate(${5 + i * 2}deg) scale(${1 - i * 0.03})`,
              transformOrigin: 'center center',
            }}
          />
        ))}
      </div>

      {/* Bottom-right paragraph */}
      <div className="absolute bottom-16 right-10 max-w-[600px] text-right z-20">
        <p
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: '20px',
            fontWeight: 400,
            lineHeight: '28px',
            color: '#ffffff',
          }}
        >
          The hull has been redesigned with a very pronounced double concave,
          offering exceptional tolerance to touch-ups while increasing stability.
          Thanks to this adjustment, the V3 allows you to ride narrower boards,
          and the double concave generates slightly sharper edges on the rails,
          which will improve the board’s ability to pull straight when paddling,
          thus optimizing tracking. The outline has also been refined to meet
          the demands of the most discerning riders. With its ultra-narrow
          width, it is ideal for speed enthusiasts, offering a quick takeoff
          downwind.
        </p>
      </div>
    </section>
  );
};

export default DesignInnovantSection;
