"use client";

import { Play } from "lucide-react";
import React from "react";

export default function AboutVideoSection() {
  const thumbnailPlaceholderUrl = "/images/sddefault.webp";

  const title = "The foiling spirit since 2009";
  const description =
    "AFS’s mission is to offer the best-performing foils, boards and wings, while guaranteeing first-rate accessibility and stability. To ensure that all riders can practice their sport in complete safety, whatever the conditions and whatever their riding style (freeride, carving, downwind, surf foil, etc.). These products are designed and manufactured in Brittany, France, by Foil And Co. French manufacturing using the most advanced techniques to offer you the best quality!";

  return (
    <section className="bg-black text-white py-12 px-4 sm:px-6 lg:px-10 font-['Inter']">
      {/* Mobile Layout */}
      <div className="block md:hidden max-w-2xl mx-auto flex flex-col gap-6">
        <div>
          <h2
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "28px",
              fontWeight: 700,
              lineHeight: "34px",
              color: "rgb(255, 255, 255)",
            }}
          >
            {title}
          </h2>
          <p
            className="mt-4"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "26px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {description}
          </p>
        </div>

        <div className="w-full aspect-video relative overflow-hidden rounded-xl">
          <img
            src={thumbnailPlaceholderUrl}
            alt="Factory Tour Preview"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1280x720/000000/FFFFFF?text=Video+Thumbnail";
            }}
          />
          {/* Mobile Play Button */}
          <div className="absolute inset-0 flex justify-center items-center bg-black/20">
            <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-white rounded-full text-white cursor-pointer transition-all duration-200">
              <Play className="h-4 w-4 text-white fill-white" />
              <span className="text-white text-sm font-semibold tracking-wider">
                PLAY VIDEO
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex max-w-7xl mx-auto flex-row gap-10 items-start">
        <div
          className="md:w-1/2 flex flex-col justify-end items-start space-y-4 h-full pl-8"
          style={{
            paddingRight: "40px",
            transform: "translateY(100px) translateX(-100px)",
          }}
        >
          <h2
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "40px",
              fontWeight: 700,
              lineHeight: "44px",
              color: "rgb(255, 255, 255)",
            }}
          >
            {title}
          </h2>
          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "26px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            {description}
          </p>
        </div>

        <div className="md:w-1/2 aspect-video relative rounded-xl overflow-hidden shadow-2xl">
          <img
            src={thumbnailPlaceholderUrl}
            alt="Factory Tour Preview"
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/1280x720/000000/FFFFFF?text=Video+Thumbnail";
            }}
          />
          {/* Desktop Play Button */}
          <div className="absolute inset-0 flex justify-center items-center bg-black/20">
            <button className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-white rounded-full text-white cursor-pointer transition-all duration-200">
              <Play className="h-5 w-5 text-white fill-white" />
              <span className="text-white text-base font-semibold tracking-wider">
                PLAY VIDEO
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
