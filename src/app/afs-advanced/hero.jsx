'use client';

import React, { useState, useEffect } from 'react';

// YouTube video ID
const YOUTUBE_VIDEO_ID = 'So9EJiIJ6eQ';

// Full embed URL with start and end time
const YOUTUBE_EMBED_URL =
  `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?` +
  `autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}` +
  `&controls=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1` +
  `&start=3&end=20`; // ⏱ Starts at 3s and ends at 20s

const HeroSection = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loader duration (e.g., 2.5 seconds)
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-[#0a0a0a] shadow-xl rounded-none">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <iframe
          className="absolute top-1/2 left-1/2 min-w-full min-h-full transform -translate-x-1/2 -translate-y-1/2 scale-[1.25]"
          src={YOUTUBE_EMBED_URL}
          frameBorder="0"
          allow="autoplay; encrypted-media; fullscreen"
          title="Background Video"
          style={{
            pointerEvents: 'none',
            opacity: loading ? 0 : 1,
            transition: 'opacity 1.5s ease-in-out',
          }}
        />
      </div>

      {/* Loader overlay before video appears */}
      {loading && (
        <div className="absolute inset-0 bg-[#101010] flex items-center justify-center transition-opacity duration-700">
          <div className="text-white text-xl font-light tracking-widest animate-pulse">
            
          </div>
        </div>
      )}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black opacity-30"></div>

      {/* Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <h1
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            fontSize: '60px',
            fontWeight: 100,
            lineHeight: '60px',
            color: 'rgb(255, 255, 255)',
          }}
          className="text-center drop-shadow-lg uppercase tracking-wider"
        >
          THE ESSENCE
          <br />
          OF FOILING
        </h1>
      </div>
    </div>
  );
};

export default HeroSection;
