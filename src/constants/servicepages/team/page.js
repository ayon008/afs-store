'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TeamHero from '@/constants/servicepages/team/coverimage';
import TeamsPage from '@/constants/servicepages/team/content';
import Sidebar from '@/constants/servicepages/team/sidebar';

export default function TeamPage() {
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
    <div className="min-h-screen scroll-smooth bg-black">
      {/* Hero Section */}
      <TeamHero />

      {/* Main Layout */}
      <div ref={containerRef} className="flex flex-col lg:flex-row relative z-10">
        {/* Sidebar */}
        <aside 
          ref={sidebarRef} 
          className="lg:w-1/4 lg:max-w-[260px] flex-shrink-0 hidden lg:block"
        >
          <Sidebar />
        </aside>

        {/* Content */}
        <main className="flex-grow">
          <TeamsPage />
        </main>
      </div>
    </div>
  );
}
