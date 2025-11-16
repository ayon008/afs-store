"use client";

import Image from "next/image";
import React from "react";

const FRONT_IMG =
  "https://afs-foiling.com/wp-content/uploads/2024/12/H_profil-1-600x102.png.webp";
const BG_SVG =
  "https://afs-foiling.com/wp-content/uploads/2024/12/Vector.svg";

export default function WakefoilSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-start text-white w-full overflow-hidden pt-6 sm:pt-8 md:pt-12"
      style={{
        backgroundImage: `url(${BG_SVG})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Text Content */}
      <div className="relative z-20 text-center px-4 pt-0 pb-4 sm:pt-0 lg:pt-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-2 leading-tight tracking-tight">
          Wakefoil <br /> anything
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-3xl font-medium tracking-wide uppercase mx-auto max-w-xs sm:max-w-md md:max-w-2xl text-gray-300 mb-4 leading-snug">
          The Pulse is a foil board <br />
          designed for demanding <br />
          wake, kite, and tow foil <br />
          riders
        </p>
      </div>

      {/* Front Image */}
      <div className="relative z-30 flex justify-center w-full -mt-6 md:-mt-12">
        <div className="relative w-full max-w-[98vw] md:max-w-[1400px]">
          <Image
            src={FRONT_IMG}
            alt="Pulse Wakefoil Board"
            width={1400}
            height={280}
            className="object-contain w-full h-auto select-none pointer-events-none"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Footer Text */}
      <div
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 tracking-wider"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: '21.6px',
          color: 'rgba(255, 255, 255, 0.6)',
        }}
      >
        Unmatched responsiveness and <br />
        connectivity with the foil, for a <br />
        unique gliding sensation
      </div>

      {/* Centered Bottom Line */}
      <div
        className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20 text-center"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: '16px',
          fontWeight: 600,
          lineHeight: '16px',
          color: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        Scroll to learn more
      </div>
    </section>
  );
}
