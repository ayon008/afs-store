'use client';
import React from 'react';

const MapSection = () => {
  return (
    <div className="min-h-[70vh] bg-white font-[Inter] relative overflow-x-hidden">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* ✅ Updated heading with larger top margin */}
        <h1
          className="text-center mt-40 mb-12"
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            fontSize: '70px',
            fontWeight: 700,
            lineHeight: '77px',
            color: 'rgb(17, 17, 17)',
          }}
        >
          AFS Ambassadors{' '}
          <span
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: '70px',
              fontWeight: 700,
              lineHeight: '77px',
              color: 'rgb(29, 152, 255)',
            }}
          >
            team
          </span>
        </h1>

        {/* ✅ SVG map section */}
        <div className="flex justify-center">
          <img
            src="/map.svg"
            alt="World Map"
            className="w-full max-w-6xl h-auto object-contain"
          />
        </div>

      </main>
    </div>
  );
};

export default MapSection;
