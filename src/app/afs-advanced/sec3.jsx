'use client';

import React from 'react';

const AFSCareSection = () => {
  // ✅ Realistic fade using blend mode (soft, dark tone with clarity)
  const backgroundStyle = {
    backgroundImage: `
      linear-gradient(rgba(28, 28, 28, 0.8), rgba(28, 28, 28, 0.8)),
      url("https://afs-foiling.com/wp-content/uploads/2022/09/CleanShot-2022-09-20-at-10.12.03@2x.png")
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'multiply', // ✅ smooth dark blend with image
  };

  const textStyle = {
    fontFamily: '"Alliance No.2", sans-serif',
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: '25px',
    color: 'rgb(255, 255, 255)',
  };

  const handleChatClick = () => {
    console.log('Chat support requested!');
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={backgroundStyle}
    >
      {/* Main content */}
      <div className="relative flex flex-col justify-center items-center p-6 sm:p-12 z-10 w-full">
        <div className="flex flex-col items-center max-w-lg w-full text-center space-y-6">

          {/* ✅ AFS Logo (perfect size) */}
          <img
            src="https://afs-foiling.com/wp-content/uploads/2022/09/logo-afs-advance-300x121.png"
            alt="AFS Logo"
            className="w-[240px] h-auto object-contain"
          />

          {/* ✅ Text content */}
          <div className="text-center space-y-5" style={textStyle}>
            <p style={{ ...textStyle, fontWeight: 500 }}>3 years warranty</p>
            <p>Extensive live consulting service with product developers</p>
            <p>Getting started session with the development team</p>
          </div>
        </div>
      </div>

      {/* ✅ Floating Chat Button */}

    </section>
  );
};

export default AFSCareSection;
