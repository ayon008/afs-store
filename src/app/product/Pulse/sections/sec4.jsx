"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Sec4 = () => {
  const firstBgRef = useRef(null);
  const secondBgRef = useRef(null);

  useEffect(() => {
    if (firstBgRef.current && secondBgRef.current) {
      // Animate first background from right → left
      gsap.fromTo(
        firstBgRef.current,
        { scaleX: 0, transformOrigin: "right center" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: firstBgRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Animate second background
      gsap.fromTo(
        secondBgRef.current,
        { scaleX: 0, transformOrigin: "right center" },
        {
          scaleX: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: secondBgRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <h2
          className="mb-4"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "50px",
            fontWeight: 700,
            lineHeight: "55px",
            color: "rgb(255, 255, 255)",
          }}
        >
          Optimized design
        </h2>

        <p
          className="max-w-3xl mx-auto mb-8 px-4"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: "33.6px",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          ITS PERFECTLY DESIGNED ROCKER RESPONDS TO THE SLIGHTEST MOVEMENT FOR A SMOOTH AND <strong>OPTIMIZED FOILING EXPERIENCE</strong>.
        </p>

        <p
          className="max-w-xl mx-auto mb-16 px-4"
          style={{
            fontFamily: '"alliance no.2", sans-serif',
            fontSize: "18px",
            fontWeight: 500,
            lineHeight: "21.6px",
            color: "rgba(255, 255, 255, 0.8)",
          }}
        >
          This innovative design provides maximum comfort and speed control. Its shape is the result of countless hours spent on the water, taking into account the most delicate details, such as how water interacts with the fins or how the rider's weight is distributed throughout the board.
        </p>

        {/* Images */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative w-full">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2024/12/H_carene-600x379.png.webp"
              alt="Top Board"
              width={600}
              height={379}
              className="w-full h-auto block"
            />
          </div>
          <div className="relative w-full -mt-80 scale-110">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2024/12/H_pont-600x398.png.webp"
              alt="Bottom Board"
              width={600}
              height={398}
              className="w-full h-auto block"
            />
          </div>
        </div>

        {/* Specs & Description */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-10">
          {/* Specs Block */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right relative">
            {/* First span */}
            <div className="relative inline-block mb-2">
              <div
                ref={firstBgRef}
                className="absolute inset-0 bg-[#ef233c] z-0 origin-right"
                style={{ borderRadius: 0 }}
              />
              <span
                className="relative z-10 inline-block px-4 py-2"
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "70px",
                  fontWeight: 700,
                  lineHeight: "70px",
                  color: "rgb(0, 0, 0)",
                }}
              >
                4'0''x19.3''
              </span>
            </div>

            {/* Second span */}
            <div className="relative inline-block mt-2">
              <div
                ref={secondBgRef}
                className="absolute inset-0 bg-[#ef233c] z-0 origin-right"
                style={{ borderRadius: 0 }}
              />
              <span
                className="relative z-10 inline-block px-4 py-2"
                style={{
                  fontFamily: '"alliance no.2", sans-serif',
                  fontSize: "70px",
                  fontWeight: 700,
                  lineHeight: "70px",
                  color: "rgb(0, 0, 0)",
                }}
              >
                19 liters
              </span>
            </div>
          </div>

          {/* Description Block */}
          <div
            className="text-center md:text-left border-t md:border-t-0 md:border-l md:pl-12 pt-6 md:pt-0"
            style={{ borderColor: "#ef233c" }}
          >
            <h3
              className="mb-3 uppercase"
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "21.6px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Unique size
            </h3>
            <p
              className="max-w-sm mx-auto md:mx-0 leading-relaxed"
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: "18px",
                fontWeight: 500,
                lineHeight: "21.6px",
                color: "rgba(255, 255, 255, 0.8)",
              }}
            >
              Compactness, lightweight, the bevel chimes and the nose shape make the board incredibly stable and easy to use. <strong>19 liters are also unique</strong>. It is the perfect volume for intermediate and expert riders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sec4;
