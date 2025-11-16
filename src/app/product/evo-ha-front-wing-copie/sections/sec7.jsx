'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
      <path d="M4 21v-7" />
      <path d="M4 10V3" />
      <path d="M12 21v-9" />
      <path d="M12 8V3" />
      <path d="M20 21v-5" />
      <path d="M20 12V3" />
      <path d="M1 14h6" />
      <path d="M9 8h6" />
      <path d="M17 16h6" />
    </svg>
    ),
    text: "EVO compatibility: modularity, transportability, and scalability for your quiver",
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <polyline points="16 16 11 11 16 6" />
        <path d="M11 11H5c0 4 0 10 10 10" />
      </svg>
    ),
    text: "Optimized glide and lift thanks to profile optimization",
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M17 11v6a4 4 0 0 1-4 4H5a4 4 0 0 1-4-4v-6M17 11L23 5M17 11L11 5" />
      </svg>
    ),
    text: "Unrestrained maneuverability thanks to a redesigned outline",
  },
  {
    id: 4,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M12 21.5s-4-4-4-6.5c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2.5-4 6.5-4 6.5z" />
        <path d="M12 9c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" />
      </svg>
    ),
    text: "Accessibility on the low beach",
  },
  {
    id: 5,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <path d="M7.5 10.5l4.5 4.5 4.5-4.5" />
      </svg>
    ),
    text: "Two complementary surfaces to cover all programs",
  },
];

const FeatureCard = React.forwardRef(({ icon, text, isPinned }, ref) => (
  <div
    ref={ref}
    className={`bg-neutral-900 p-6 rounded-md w-full h-[250px] flex flex-col transition-colors duration-300 hover:bg-neutral-800
      ${isPinned ? 'sticky top-24 self-start' : ''}`}
    style={!isPinned ? { opacity: 0, transform: 'translateY(80px) scale(0.98)' } : {}}
  >
    <div className="mb-8">{icon}</div>
    <p className="text-[20px] font-[500] leading-[28px] font-alliance text-[rgba(255,255,255,0.875)]">
      {text}
    </p>
  </div>
));


export default function App() {
  const cardRefs = useRef([]);
  cardRefs.current = [];

  const addRef = (el) => {
    if (el && !cardRefs.current.includes(el)) cardRefs.current.push(el);
  };

  useEffect(() => {
    // cleanup any existing triggers if hot-reloading
    ScrollTrigger.getAll().forEach(t => t.kill());

    // set initial state for all non-pinned cards
    const nonPinned = cardRefs.current.slice(1);
    gsap.set(nonPinned, { y: 80, opacity: 0, scale: 0.98 });

    const triggers = nonPinned.map((el) => {
      // each card animates when it comes into view
      const anim = gsap.to(el, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: 'power3.out',
        overwrite: true,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',   // when top of card hits 85% viewport height
          end: 'top 60%',     // end slightly higher
          toggleActions: 'play none none reverse', // play on enter, reverse on leave back
          // scrub: false,    // toggleActions is fine for quick entrance
          markers: false,
        },
      });
      return anim;
    });

    // Optional: add small hover pop for all cards to feel tactile
    const hoverTweens = cardRefs.current.map((el, idx) => {
      if (idx === 0) return null; // skip pinned if you want
      const t = gsap.to(el, {
        scale: 1.02,
        paused: true,
        duration: 0.25,
        ease: 'power1.out',
      });
      el.addEventListener('mouseenter', () => t.play());
      el.addEventListener('mouseleave', () => t.reverse());
      return { el, t };
    });

    return () => {
      // cleanup ScrollTriggers + event listeners
      ScrollTrigger.getAll().forEach(t => t.kill());
      hoverTweens.forEach((h) => {
        if (!h) return;
        h.el.removeEventListener('mouseenter', () => h.t.play());
        h.el.removeEventListener('mouseleave', () => h.t.reverse());
        h.t.kill();
      });
      gsap.killTweensOf(nonPinned);
    };
  }, []);

  return (
    <div className="bg-black min-h-screen py-20 px-4 font-sans antialiased">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center">
          <h1 className="text-[50px] font-[700] leading-[50px] font-alliance text-white mt-20">
            Why choose EVO HA?
          </h1>
        </header>

        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              ref={addRef}
              icon={feature.icon}
              text={feature.text}
              isPinned={index === 0}
            />
          ))}
        </section>
      </div>
    </div>
  );
}
