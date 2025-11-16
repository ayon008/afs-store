"use client";

import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Waves, Minimize2, Feather, Maximize } from 'lucide-react'; 

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Waves,
    boldText: "Significant increase",
    regularText: " in lift and stability without sacrificing maneuverability."
  },
  {
    icon: Minimize2,
    boldText: "Reduced drag",
    regularText: " for optimal performance over long distances."
  },
  {
    icon: Feather,
    boldText: "Pure, fluid gliding sensations,",
    regularText: " reducing fatigue during extended sessions."
  },
  {
    icon: Maximize,
    boldText: "Enhanced versatility",
    regularText: " thanks to compatibility with different foil setups."
  }
];

export default function Sec4() {
  const main = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [".gsap-heading-s4", ".gsap-card-s4"];
      
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
      <div className="px-12 py-20 md:px-20 md:py-24 lg:px-28 lg:py-32 max-w-7xl mx-auto">
        
        {/* === Heading === */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 md:mb-16 gsap-heading-s4 text-center">
          Key benefits:
        </h2>

        {/* === Benefits Grid Wrapper === */}
        {/* THIS IS THE CHANGE:
          Changed from "max-w-5xl" to "max-w-4xl" to make the grid container narrower.
        */}
        <div className="max-w-4xl mx-auto"> 
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="bg-neutral-900 p-6 lg:p-8 rounded-lg flex flex-col justify-between min-h-[220px] lg:min-h-[260px] gsap-card-s4"
                >
                  {/* Icon */}
                  <IconComponent className="w-8 h-8 text-neutral-400" />
                  
                  {/* Text */}
                  <p className="text-lg lg:text-xl">
                    <strong className="text-white">{benefit.boldText}</strong>
                    <span className="text-neutral-300">{benefit.regularText}</span>
                  </p>
                </div>
              );
            })}
          </div>
        </div> {/* End of new wrapper */}

      </div>
    </div>
  );
}