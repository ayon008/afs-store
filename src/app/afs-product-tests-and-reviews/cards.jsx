"use client";

import React, { useState } from "react";

const cardData = {
  imageUrl: "https://placehold.co/400x250/1F2937/FFFFFF?text=Wingfoil+Review",
  title: "PURE ET PURE HA EN WINGFOIL ET SUP FOIL !",
  context: "(FR)",
  description:
    "J'ai longuement testé depuis cet été les foils AFS Pure et Pure HA (made in France en carbone prepreg) en wingfoil et en SUP foil. Dans cette...",
};

const Card = () => {
  const { imageUrl, title, context, description } = cardData;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="font-sans w-full max-w-md mx-auto cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Area */}
      <div className="w-full h-auto">
        <img
          src={imageUrl}
          alt="Wingfoil and SUP Foil Review Thumbnail"
          className="w-full h-auto object-cover transition-transform duration-500 ease-in-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/400x250/AAAAAA/000000?text=Image+Error";
          }}
        />
      </div>

      {/* Content Area */}
      <div className="p-4">
        {/* Title and Context */}
        <h2
          className={`text-lg sm:text-xl font-extrabold uppercase leading-tight mb-2 transition-colors duration-300 ${
            hovered ? "text-blue-600" : "text-gray-900"
          }`}
        >
          {title}{" "}
          <span className="text-base font-normal ml-1 text-gray-600">{context}</span>
        </h2>

        {/* Description */}
        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>

        {/* Hover text */}
        <p
          className={`text-sm text-blue-600 font-medium mt-2 transition-opacity duration-300 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          Read the test
        </p>
      </div>
    </div>
  );
};

export default Card;
