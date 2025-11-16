"use client";

import { useState } from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 flex items-center justify-center p-4 font-sans">
      <ProfileCard
        name="John Doe"
        title="Lead Designer"
        defaultImage="https://placehold.co/400x550/141e52/ffffff?text=Default+Image"
        hoverImage="https://placehold.co/400x550/0a0a0a/ffffff?text=Hover+Image"
      />
    </main>
  );
}

export const ProfileCard = ({ name, title, defaultImage, hoverImage }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isTitleHovering, setIsTitleHovering] = useState(false);

  return (
    <div
      className="relative 
              w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[25vw] xl:w-[19vw] 
              h-[40vh] sm:h-[45vh] md:h-[50vh] 
              overflow-hidden rounded-md cursor-pointer 
              transition-all duration-500 group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setIsTitleHovering(false);
      }}
    >
      {/* Default Image */}
      <img
        src={defaultImage}
        alt={name}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovering ? "opacity-0" : "opacity-100"
          }`}
      />

      {/* Hover Image */}
      <img
        src={hoverImage}
        alt={`${name} hover`}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovering ? "opacity-100" : "opacity-0"
          }`}
      />

      {/* Overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 pt-12 sm:pt-16 
               bg-gradient-to-t from-black/90 to-transparent 
               transition-all duration-500"
        onMouseEnter={() => setIsTitleHovering(true)}
        onMouseLeave={() => setIsTitleHovering(false)}
      >
        <h2
          className={`text-white text-lg sm:text-xl md:text-2xl font-extrabold uppercase mb-1 tracking-wide transition-transform duration-500 ${isHovering ? "-translate-y-[6px]" : ""
            }`}
        >
          {name}
        </h2>

        <p
          style={{
            fontFamily: '"Alliance No.2", sans-serif',
            fontWeight: 700,
            lineHeight: "20.2987px",
            color: "rgb(245, 248, 251)",
          }}
          className={`text-sm sm:text-base md:text-[20.2987px] transition-all duration-500 ${isTitleHovering ? "blur-[1px] brightness-90" : ""
            }`}
        >
          {title}
        </p>
      </div>
    </div>

  );
};
