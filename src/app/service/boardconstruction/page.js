'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AdvancedBoardHero from '@/constants/servicepages/boardconstruction/coverimage';
import Content from './components/content';
import Sidebar from './components/sidebar';

export default function BoardConstruction() {
  const sidebarRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sidebarEl = sidebarRef.current;
    const containerEl = containerRef.current;

    // Clean previous ScrollTriggers
    ScrollTrigger.getAll().forEach((t) => t.kill());

    ScrollTrigger.create({
      trigger: containerEl,
      start: 'top top+=80', // Sidebar starts pinning just after Hero
      end: () => `bottom bottom-=100`, // releases near end of content
      pin: sidebarEl,
      pinSpacing: false,
      anticipatePin: 1,
      scrub: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen scroll-smooth">
      {/* HERO */}
      <AdvancedBoardHero />

      {/* MAIN FLEX LAYOUT */}
      <div ref={containerRef} className="flex flex-col md:flex-row bg-white relative z-10">
        {/* SIDEBAR */}
        <aside ref={sidebarRef} className="md:w-64 flex-shrink-0">
          <Sidebar />
        </aside>

        {/* CONTENT */}
        <main className="flex-grow">
          <Content />
        </main>
      </div>
    </div>
  );
}
