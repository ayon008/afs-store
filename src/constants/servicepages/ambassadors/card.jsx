"use client"; // needed if using app/ directory in Next.js 13+

import Image from "next/image";
import React from "react";

export default function ProfileCard() {
  const nameFirst = "ROBERTO";
  const nameLast = "ALEN";
  const location = "SPAIN";
  const imageUrl = "/images/profile-placeholder.jpg"; // Replace with your image path

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-inter">
      <div className="flex w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">

        {/* Left Side: Text */}
        <div className="flex flex-col justify-between p-8 sm:p-12 w-full md:w-1/2">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase leading-none text-gray-900">
              {nameFirst}
            </h1>
            <h1 className="text-3xl sm:text-4xl font-extrabold uppercase leading-none text-gray-900">
              {nameLast}
            </h1>
          </div>

          <div className="mt-16">
            <p className="text-sm sm:text-base font-semibold uppercase text-gray-700 tracking-wider">
              {location}
            </p>
          </div>
        </div>

        {/* Right Side: Image with Fade Overlay */}
        <div className="relative hidden md:block md:w-1/2 min-h-[350px] sm:min-h-[400px] group">
          <Image
            src={imageUrl}
            alt={`${nameFirst} ${nameLast}`}
            fill
            className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
            onError={(e) => {
              e.target.src = "/images/fallback.jpg"; // fallback image
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-500 flex items-center justify-center">
            <a
              href="#"
              className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500"
            >
              View All
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
