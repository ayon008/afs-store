"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

const cardData = [
  {
    id: 1,
    title: "BEST MATCH STAB",
    description: "Find the right stab for your front wing and your riding style.",
    image: "/images/customerservice/2.jpeg",
  },
  {
    id: 2,
    title: "COMPARE 3 STABS",
    description: "Want to compare stabilizers with your front wing?",
    image: "/images/customerservice/1.png",
  },
  {
    id: 3,
    title: "EQUIPMENT RECOVERY",
    description: "We’ll take back your old AFS equipment if you buy a new product from us.",
    image: "/images/customerservice/3.jpg",
  },
];

const Card = ({ title, description, image }) => (
  <div className="relative flex bg-[#f9f9f9] rounded-md overflow-hidden h-[50vw] min-h-[300px] max-h-[420px] w-[90vw] sm:w-[70vw] md:w-[45vw] lg:w-[35vw] mr-4 sm:mr-6 shadow-sm group transition-all duration-500 ease-in-out">
    {/* Content */}
    <div className="flex-1 flex flex-col justify-center px-4 sm:px-8 z-10">
      <h2 className="text-[14px] sm:text-[16px] font-extrabold tracking-wide uppercase mb-3 text-[#1a1a1a]">
        {title}
      </h2>
      <p className="text-[13px] sm:text-[15px] text-[#444] leading-relaxed">{description}</p>
    </div>

    {/* Image */}
    <div className="relative w-[50%] h-full overflow-hidden">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        priority
      />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
      <span
        className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-500 group-hover:after:w-full"
        style={{
          fontFamily: '"Alliance No.2", sans-serif',
          fontSize: "14px",
          fontWeight: 600,
          lineHeight: "19.11px",
          color: "rgb(255, 255, 255)",
          letterSpacing: "1px",
          textTransform: "uppercase",
          paddingBottom: "4px",
        }}
      >
        View All
      </span>
    </div>
  </div>
);

export default function CustomerServiceSwiper() {
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const CARD_COUNT = cardData.length;
  const CARD_MARGIN = 16; // Reduced for smaller screens

  const updateSwiperPosition = useCallback((newIndex) => {
    if (!swiperRef.current) return;
    const cardElement = swiperRef.current.children[0];
    if (!cardElement) return;
    const cardWidth = cardElement.offsetWidth + CARD_MARGIN;
    swiperRef.current.style.transform = `translateX(-${newIndex * cardWidth}px)`;
    setCurrentIndex(newIndex);
  }, []);

  const handleNext = () => updateSwiperPosition(Math.min(currentIndex + 1, CARD_COUNT - 1));
  const handlePrev = () => updateSwiperPosition(Math.max(currentIndex - 1, 0));

  return (
    <section className="w-full bg-white py-8 sm:py-16 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 overflow-hidden relative">
        {/* Header */}
        <h1 className="text-[28px] sm:text-[40px] font-extrabold text-black mb-6 sm:mb-10">
          AFS Customer Service
        </h1>

        {/* Swiper container */}
        <div className="relative">
          <div
            ref={swiperRef}
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              width: "max-content",
              minHeight: "300px",
            }}
          >
            {cardData.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>

          {/* Bottom Center Navigation */}
          <div className="flex justify-center items-center space-x-4 mt-6 sm:mt-8">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-200 ${
                currentIndex === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex === CARD_COUNT - 1}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-sm transition-all duration-200 ${
                currentIndex === CARD_COUNT - 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-100"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Inline CSS for Additional Responsiveness */}
      <style jsx>{`
        @media (max-width: 640px) {
          .relative.flex {
            flex-direction: column;
            height: auto;
            min-height: 400px;
            width: 90vw;
          }
          .relative.w-\[50\%\] {
            width: 100%;
            height: 50%;
          }
          .flex-1 {
            padding: 16px;
          }
          .text-\[28px\] {
            font-size: 24px;
          }
        }
      `}</style>
    </section>
  );
}