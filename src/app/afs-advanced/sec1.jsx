'use client';

import React from 'react';

const AdvancedSection = () => {
  const img1 =
    'https://afs-foiling.com/wp-content/uploads/2022/09/CleanShot-2022-09-14-at-11.51.22.jpg';
  const img2 =
    'https://afs-foiling.com/wp-content/uploads/2022/09/CleanShot-2022-09-14-at-09.56.24.jpg';
  const img3 =
    'https://afs-foiling.com/wp-content/uploads/2022/09/Group-16-1536x984.png';

  return (
    <div
      className="text-white font-['Inter',_sans-serif] overflow-hidden"
      style={{ backgroundColor: '#1c1c1c' }}
    >
      {/* SECTION 1: Heading Text */}
      <div className="max-w-6xl mx-auto text-center pt-24 mb-16 px-4">
        <h1
          className="text-[40px] md:text-[50px] font-semibold leading-[48px] md:leading-[55px] text-white"
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            color: 'rgb(255, 255, 255)',
          }}
        >
          <span className="font-light">
            AFS Advanced is our way of concentrating our
          </span>{' '}
          <b className="font-bold">know-how</b>{' '}
          <span className="font-light">and</span>{' '}
          <b className="font-bold">expertise</b>{' '}
          <span className="font-light">
            into the most advanced designs, which is the essence and the
          </span>{' '}
          <b className="font-bold underline decoration-1">future of AFS.</b>
        </h1>
      </div>

      {/* SECTION 2: Two Smaller Images */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 px-4 md:px-8">
        <div className="relative scale-105 md:-translate-x-6 shadow-xl">
          <img
            src={img1}
            alt="CNC machine in operation"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="shadow-xl">
          <img
            src={img2}
            alt="Engineer looking intently at a screen"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* SECTION 3: Large Image — Full Width (No Container) */}
      <div className="w-full pb-20">
        <img
          src={img3}
          alt="Engineer working on colorful 3D models on dual monitors"
          className="w-full h-auto object-cover object-center block"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default AdvancedSection;
