"use client";

import React from "react";

const TEAM_IMAGE_URL = "/images/team/group/cover.webp";

export default function TeamSection() {
  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased overflow-hidden">
      {/* --- Main Heading --- */}
      <h1
        className="text-center mt-12 mb-16"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "70px",
          fontWeight: 700,
          lineHeight: "70px",
          color: "rgb(17, 17, 17)",
        }}
      >
        The Foil And Co. team
      </h1>

      {/* --- Image and Text Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center px-6 md:px-12 gap-6 lg:gap-10">
        {/* Left Column: Image */}
        <div className="lg:col-span-2 flex justify-start relative">
          <img
            src={TEAM_IMAGE_URL}
            alt="The Foil And Co. team"
            className="w-[120%] max-w-none h-auto object-cover shadow-2xl ml-12" // 👈 Added margin-left
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/2000x1000/cccccc/000000?text=Image+Not+Available";
            }}
          />
        </div>

        {/* Right Column: Text */}
<div className="lg:col-span-1 z-10 -mt-4">
  <h2
    style={{
      fontFamily: '"alliance no.2", sans-serif',
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: "39.6px",
      color: "rgb(17, 17, 17)",
    }}
    className="mb-4"
  >
    Employees driven by the same passion
  </h2>
  <p
    style={{
      fontFamily: '"alliance no.2", sans-serif',
      fontSize: "18px",
      fontWeight: 500,
      lineHeight: "26px",
      color: "rgb(17, 17, 17)",
    }}
    className="mb-0"
  >
    At Foil And Co., our team shares a common passion for innovation and
    excellence. Each member contributes to advancing our mission with
    commitment, creativity, and expertise. We pride ourselves on our
    collaborative spirit and dedication to delivering the best results
    for our customers and partners.
  </p>
</div>

      </div>
    </div>
  );
}
