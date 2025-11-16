"use client";

import React from "react";

const AFSEventsHero = () => {
  return (
    <section
      className="h-[45vh] flex flex-col items-center justify-center font-sans"
      style={{ backgroundColor: "#111111", color: "#fff" }}
    >
      {/* Main Title */}
      <h1
        className="text-center mb-4"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "70px",
          fontWeight: 700,
          lineHeight: "70px",
          color: "rgb(255, 255, 255)",
        }}
      >
        AFS Events
      </h1>

      {/* Subtitle */}
      <p
        className="text-center max-w-xl px-4"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "18px",
          fontWeight: 500,
          lineHeight: "21.6px",
          color: "rgba(255, 255, 255, 0.75)",
        }}
      >
        Discover all our brand events organized by AFS.
      </p>
    </section>
  );
};

export default AFSEventsHero;
