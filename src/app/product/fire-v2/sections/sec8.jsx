// app/components/FireV2Section.tsx
"use client";

import React from "react";

const FireV2Section = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="https://afs-foiling.com/wp-content/uploads/2023/11/11291.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay (optional for contrast) */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h2 className="text-5xl md:text-7xl font-bold mb-4">Fire V2</h2>
        <p className="text-lg md:text-2xl font-light">
          The flagship of your Quiver!
        </p>
      </div>
    </section>
  );
};

export default FireV2Section;
