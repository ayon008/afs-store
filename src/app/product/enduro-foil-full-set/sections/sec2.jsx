// components/HeroSection.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const pRef = useRef(null);

  useEffect(() => {
    const words = pRef.current.querySelectorAll('span');

    gsap.fromTo(
      words,
      { color: 'rgba(255,255,255,0.5)' }, // starting color
      {
        color: '#49a6f4', // blue color
        stagger: 0.05, // animate one word after another
        scrollTrigger: {
          trigger: pRef.current,
          start: 'top 80%', // when the top of paragraph reaches 80% of viewport
          end: 'bottom 20%',
          scrub: true, // smooth scrubbing
        },
      }
    );
  }, []);

  const paragraphText =
    'With six sizes available—700, 800, 900, 1000, 1100, and 1300 cm2—you have a full range of options to choose from. Fully removable, these new front wings are compatible with all our Fuselink fuselages.';

  return (
    <div className="flex min-h-screen flex-col bg-black p-8 text-white font-['alliance_no.2',_sans-serif] md:p-16 lg:p-24">
      <div className="flex flex-col w-full">
        <h1 className="text-[70px] font-medium leading-[70px]">
          Remarkable lift and glide at low speeds, guaranteeing comfort and
          intuitive handling worthy of a hump wing designed by Laurent Borgna.
          Pumping has never been so efficient.
        </h1>

        {/* Paragraph with each word wrapped in span for GSAP */}
        <p
          ref={pRef}
          className="mt-0 text-[22px] font-medium leading-[28px] text-white/80 lg:w-1/3 self-end"
        >
          {paragraphText.split(' ').map((word, index) => (
            <span key={index} className="inline-block mr-1">
              {word}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
