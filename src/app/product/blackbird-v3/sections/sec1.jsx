'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const BlackbirdHeroSection = () => {
  const imageRef = useRef(null);
  const textWrapperRef = useRef(null);
  const textRef = useRef(null);
  const imageUrl = 'https://afs-foiling.com/wp-content/uploads/2024/10/hero_bg.png';
  const smallImageUrl = 'https://afs-foiling.com/wp-content/uploads/2024/10/DSC07110@2x-1.png.webp';

  useEffect(() => {
    // Image blur on scroll
    if (imageRef.current) {
      gsap.set(imageRef.current, { filter: 'blur(15px)' });
      gsap.to(imageRef.current, {
        filter: 'blur(0px)',
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      });
    }

    // Text + background blur animation
    if (textWrapperRef.current && textRef.current) {
      gsap.set(textWrapperRef.current, { backdropFilter: 'blur(0px)', autoAlpha: 0 });
      gsap.set(textRef.current, { y: 60, autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'center center+=200',
          end: 'bottom top',
          scrub: true,
        },
      });

      tl.to(textWrapperRef.current, {
        autoAlpha: 1,
        backdropFilter: 'blur(10px)',
        duration: 0.6,
        ease: 'power2.out',
      });
      tl.to(
        textRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.3'
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white relative">
      {/* Left content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between pt-16 lg:pt-20 xl:pt-24 pb-12 px-8 lg:px-16 xl:px-24 bg-gray-50">
        <div>
          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '22px',
              fontWeight: 400,
              lineHeight: '26.4px',
              color: 'rgba(17, 17, 17, 0.75)',
              marginBottom: '1.5rem',
            }}
          >
            Welcome to the fascinating world of Blackbird, the <br />
            perfect fusion of passion and bold innovation <br /> from AFS Advanced.
          </p>
        </div>

        <div>
          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '16px',
              color: 'rgb(31, 31, 31)',
              marginBottom: '0.75rem',
            }}
          >
            BLACKBIRD V3
          </p>

          <h1
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '70px',
              fontWeight: 700,
              lineHeight: '70px',
              color: 'rgb(0, 0, 0)',
            }}
            className="max-w-xl leading-tight"
          >
            For ultra high,<br />downwind performance
          </h1>
        </div>
      </div>

      {/* Right image section */}
      <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen relative overflow-hidden">
        <img
          ref={imageRef}
          src={imageUrl}
          alt="Blackbird V3 background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(15px)' }}
          loading="eager"
        />

        {/* Scroll-reveal text overlay with blurred backdrop and top image */}
        <div
          ref={textWrapperRef}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 bg-black/20"
          style={{
            backdropFilter: 'blur(0px)',
            WebkitBackdropFilter: 'blur(0px)',
            transition: 'backdrop-filter 0.3s ease',
          }}
        >
          <div ref={textRef} className="flex flex-col items-center space-y-6">
            {/* Small top image */}
            <img
              src={smallImageUrl}
              alt="Blackbird Detail"
              className="w-28 h-auto object-contain mb-2 opacity-90"
              loading="lazy"
            />

            {/* Main text */}
            <p
              style={{
                fontFamily: '"alliance no.2", sans-serif, serif',
                fontSize: '42px',
                fontWeight: 500,
                lineHeight: '42px',
                color: 'rgb(255, 255, 255)',
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                maxWidth: '700px',
              }}
            >
              Designed with precision for extreme water sports enthusiasts, the Blackbird V3 is the successor to
              the Blackbird V2, improved to offer an unparalleled riding experience. Every element, from the hull
              to the outline, has been redesigned to maximize performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackbirdHeroSection;
