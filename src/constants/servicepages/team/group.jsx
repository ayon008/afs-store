"use client";

import React from "react";

export const ImageCard = ({ title, defaultImageUrl, hoverImageUrl }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="group relative w-full max-w-[1500px] aspect-[16/9] rounded-lg overflow-hidden cursor-pointer">
        {/* Default Image */}
        <img
          src={defaultImageUrl}
          alt={`${title} default`}
          className="absolute inset-0 w-full h-full object-cover group-hover:opacity-0 transition-none"
        />

        {/* Hover Image (immediate switch) */}
        <img
          src={hoverImageUrl}
          alt={`${title} hover`}
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-none"
        />

        {/* Overlay with title */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center overflow-hidden">
          <h1
            className="
              text-white text-4xl sm:text-5xl lg:text-6xl font-bold text-center p-4
              transform transition-transform duration-200
              group-hover:translate-y-16
            "
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const cardData = {
    title: "Foils Productio",
    defaultImageUrl:
      "https://placehold.co/1200x800/2F4F4F/FFFFFF?text=Foils+production+%7C+Team",
    hoverImageUrl:
      "https://placehold.co/1200x800/8B4513/FFFFFF?text=Foils+production+%7C+Machinery",
  };

  return (
    <main className="font-sans">
      <ImageCard {...cardData} />
    </main>
  );
}
