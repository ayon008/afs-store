"use client";

import Image from 'next/image';
// Make sure useState is imported here
import { useRef, useLayoutEffect, useState } from 'react'; 
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- SLIDER DATA ---
const slides = [
  {
    url: "https://afs-foiling.com/wp-content/uploads/2025/05/Group-1-4.png.webp",
    alt: "Ultra HA Foil"
  },
  {
    url: "https://afs-foiling.com/wp-content/uploads/2025/05/Group-1-4.png.webp",
    alt: "SILK Foil"
  },
  {
    url: "https://afs-foiling.com/wp-content/uploads/2025/05/Group-1-4.png.webp",
    alt: "ENDURO Foil"
  }
];
// -------------------


export default function Sec3() {
  const main = useRef(null);
  
  // This is the corrected line:
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        ".gsap-heading-s3", 
        ".gsap-text-s3", 
        ".gsap-slider-s3", 
        ".gsap-footer-s3"
      ];
      
      gsap.from(elements, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: main.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        }
      });

    }, main); 

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-black text-white font-sans overflow-x-hidden" ref={main}>
      <div className="px-12 py-20 md:px-20 md:py-24 lg:px-28 lg:py-32 flex flex-col max-w-7xl mx-auto">
        
        {/* === Text Content === */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold gsap-heading-s3">
          Versatility across multiple foil ranges
        </h2>
        <p className="text-base font-light mt-6 leading-relaxed gsap-text-s3">
          The Glide 41 stabilizer is now compatible not only with the Ultra HA foil, but also with the SILK and ENDURO ranges, broadening its appeal and ensuring a more varied riding experience.
        </p>

        {/* === Image Slider === */}
        <div className="relative w-full max-w-6xl mt-16 md:mt-24 gsap-slider-s3">
          {/* Slider Container */}
          <div className="overflow-hidden relative">
            {/* Slider Track */}
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="flex-none w-full flex justify-center items-center">
                  <Image
                    src={slide.url}
                    alt={slide.alt}
                    width={1920}
                    height={1080}
                    className="w-full h-auto max-w-5xl"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 left-2 md:-left-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-10 transition-colors"
            aria-label="Previous Slide"
          >
            <ArrowLeft size={24} />
          </button>
          
          {/* Next Button */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 right-2 md:-right-12 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white z-10 transition-colors"
            aria-label="Next Slide"
          >
            <ArrowRight size={24} />
          </button>

          {/* Dots Indicator - Aligned left */}
          <div className="flex justify-start gap-2 mt-8">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-white/90 w-6' : 'bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* === ADDED TEXT SECTION === */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-20 md:mt-28 lg:mt-36 gsap-footer-s3">
          The Stab Glide 41 will undoubtedly elicit a “wow” effect and offer the ultimate gliding sensation that riders seek.
        </h2>

      </div>
    </div>
  );
}