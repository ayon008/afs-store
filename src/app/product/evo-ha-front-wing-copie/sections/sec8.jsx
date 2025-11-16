// components/EvoHASection.js
'use client';
import React from 'react';

export default function EvoHASection() {
  return (
    <section className="w-full flex flex-col items-start justify-center py-20 px-10 bg-black gap-10">
      {/* First text stays exactly the same */}
      <p
        className="whitespace-pre-line text-white/80 w-full mb-10"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: '90px',
          fontWeight: 500,
          lineHeight: '90px',
        }}
      >
        The EVO HA range sets the new {'\n'} standard for versatile high aspect ratio{'\n'} kites. The sensations of the PURE HA {'\n'} range from AFS Advanced are now within everyone's reach—detachable, {'\n'}sharp, and ready for any session.
      </p>

      {/* Grey container */}
      <div className="w-full bg-[#1f1f1f] relative flex items-start p-10 overflow-hidden" style={{ minHeight: '550px' }}>
        {/* Left content at top-left */}
        <div className="flex flex-col justify-start z-10">
          <h2
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '50px',
              fontWeight: 700,
              lineHeight: '50px',
              color: 'rgb(255, 255, 255)',
            }}
            className="mb-6"
          >
            Ready to change <br /> dimensions?
          </h2>

          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif, serif',
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '21.6px',
              color: 'rgb(255, 255, 255)',
            }}
          >
            Choose your configuration (EVO HA750 or <br /> HA1000) and discover a new standard in <br />gliding.
          </p>
        </div>

        {/* Right image breaking out of container */}
        <div className="absolute top-0 right-0 h-full w-11/12" style={{ marginRight: '-400px' }}>
          <img
            src="https://afs-foiling.com/wp-content/uploads/2025/05/HA1000_0003-1.png.webp"
            alt="EVO HA"
            className="h-full w-full object-contain"
            style={{ display: 'block', transform: 'scale(1.2)' }}
          />
        </div>
      </div>
    </section>
  );
}
