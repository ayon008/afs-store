'use client';

import React from 'react';

/**
 * Mission Pillar data
 */
const pillars = [
  { title: "Development", description: "Develop products of excellence." },
  { title: "Expertise", description: "Provide advanced expertise at the highest level." },
  { title: "Innovation", description: "Innovation at the service of passion." },
  { title: "Experience", description: "Offer an exceptional customer experience." },
];

/**
 * Single Mission Pillar Component
 */
const MissionPillar = ({ title, description }) => (
  <div className="mb-12 md:mb-16"> {/* increased spacing */}
    <h3
      className="mb-3"
      style={{
        fontFamily: '"Alliance No.2", sans-serif',
        fontSize: '32px',
        fontWeight: 600,
        lineHeight: '36px',
        color: 'rgb(255, 255, 255)',
      }}
    >
      {title}
    </h3>
    <p
      style={{
        fontFamily: '"Alliance No.2", sans-serif',
        fontSize: '18px',
        fontWeight: 300,
        lineHeight: '28px',
        color: 'rgba(255, 255, 255, 0.75)',
      }}
    >
      {description}
    </p>
  </div>
);

/**
 * Mission Section Component
 */
export default function MissionSection() {
  return (
    <section
      className="min-h-screen text-white py-12 sm:py-16 lg:py-20"
      style={{ backgroundColor: '#1c1c1c' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* reduced left padding */}
        
        {/* --- Header Section --- */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-10 md:mb-16">
          <h1
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '80px',
              fontWeight: 400,
              lineHeight: '80px',
              color: 'rgb(255, 255, 255)',
            }}
            className="leading-tight mb-4 md:mb-0 text-5xl sm:text-6xl md:text-[80px]"
          >
            OUR MISSIONS
          </h1>
          <p
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '20px',
              fontWeight: 400,
              lineHeight: '30px',
              color: 'rgb(255, 255, 255)',
            }}
            className="max-w-xs md:text-right text-base sm:text-lg pt-2 md:mr-2"
          >
            Our mission at AFS Advanced is based on 4 pillars.
          </p>
        </header>

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Side: Image */}
          <div className="relative overflow-hidden rounded-none shadow-2xl aspect-[4/5] md:ml-[-2rem] lg:ml-[-3rem]"> 
            {/* pulled image left */}
            <img
              src="https://afs-foiling.com/wp-content/uploads/2022/09/CleanShot-2022-09-27-at-11.03.18@2x-768x820.jpg"
              alt="Team working"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Side: Mission Pillars */}
          <div className="pt-4 md:pl-12 lg:pl-16"> {/* pushed pillars slightly right */}
            {pillars.map((pillar, index) => (
              <MissionPillar key={index} {...pillar} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
