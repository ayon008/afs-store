"use client";

import React from "react";
import Image from "next/image";

const infoCards = [
  {
    id: 1,
    title: "The Team",
    image: "/images/customerservice/team.jpg",
    link: "https://afs-foiling.com/afs-team/",
  },
  {
    id: 2,
    title: "AFS Ambassadors",
    image: "/images/customerservice/am.png",
    link: "https://afs-foiling.com/fr/ambassadeur-afs/",
  },
];

const InfoCard = ({ title, image, link }) => {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block overflow-hidden rounded-lg bg-gray-100 shadow-md transition-all duration-500 ease-out"
    >
      {/* Image */}
      <div className="relative w-full h-[480px] md:h-[520px] lg:h-[560px]">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-transparent"></div>

      {/* Text + Button Container */}
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        {/* Title */}
        <div>
          <h2 className="relative text-white text-3xl md:text-4xl font-bold tracking-tight inline-block pb-1">
            {title}
            {/* Hover underline animation */}
            <span className="absolute left-0 bottom-0 h-[3px] w-0 bg-white transition-all duration-500 ease-out group-hover:w-full"></span>
          </h2>
        </div>

        {/* Button (appears from bottom) */}
       <div className="opacity-0 translate-y-6 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex justify-center">
  <button className="px-6 py-3 bg-white text-black font-semibold tracking-wide rounded-md shadow-md hover:bg-gray-200">
    View All
  </button>
</div>

      </div>
    </a>
  );
};

const MoreAboutAFS = () => {
  return (
    <section className="py-20 bg-white font-['Alliance No.2'] antialiased">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-14 text-center md:text-left">
          More About AFS
        </h1>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {infoCards.map((card) => (
            <InfoCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MoreAboutAFS;
