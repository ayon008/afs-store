'use client';

import React, { useState, useEffect, useRef } from 'react';

const hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2022/07/DSC07778.png";

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) observer.observe(contentRef.current);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">

      {/* Full-Screen Header */}
      <header className="h-screen flex flex-col items-center justify-center p-6 sm:p-10 lg:p-20 bg-white">
        <div className="max-w-6xl w-full text-center">

          {/* Main Heading */}
          <h1
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '70px',
              fontWeight: 700,
              lineHeight: '70px',
              color: 'rgb(17, 17, 17)',
            }}
            className="mb-10"
          >
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              Foil & Co, a fundamentally responsible
            </span>
            <br />
            <span style={{ display: 'inline-block' }}>company</span>
          </h1>

          {/* Image Container */}
          <div className="overflow-hidden rounded-lg shadow-2xl">
            <img 
              src={imageUrl} 
              alt="Interior view of a modern office space and warehouse" 
              className="w-full h-auto object-cover max-h-[80vh] md:max-h-[90vh]"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "https://placehold.co/1200x600/cccccc/333?text=Image+Unavailable";
              }}
            />
          </div>
        </div>
      </header>

      {/* Text Content with Smooth Fade-In */}
      <section 
        ref={contentRef}
        className={`
          py-16 px-6 sm:px-10 lg:px-20 flex justify-center
          transition-all duration-1000 ease-out 
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        `}
      >
        <div className="max-w-3xl text-center space-y-8">

          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '30px',
              color: 'rgb(51, 51, 51)',
            }}
          >
            Foil & Co. is a responsible and ethical company, committed to our planet. We believe in creating a healthier future for everyone. 
            Our principles guide us to make a difference in the world, one product at a time.
          </p>

          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '20px',
              fontWeight: 500,
              lineHeight: '30px',
              color: 'rgb(51, 51, 51)',
            }}
          >
            Our journey is one of continuous learning and evolution. We review materials, packaging, and logistics to minimize our environmental footprint. 
            We ensure responsible sourcing and strive for true circularity in all operations.
          </p>
        </div>
      </section>

      <div className="h-40"></div>
    </div>
  );
};

export default hero;
