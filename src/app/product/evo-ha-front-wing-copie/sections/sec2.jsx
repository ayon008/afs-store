"use client";

import React from "react";

export default function EvoTextSection() {
  return (
    <section className="flex items-center justify-center h-screen bg-black">
      <p
        className="text-center"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "90px",
          fontWeight: 400,
          lineHeight: "90px",
          color: "rgba(255, 255, 255, 0.8)",
          maxWidth: "90%",
        }}
      >
        At AFS, we have always had one ambition: to push the boundaries of
        snowboarding while making our innovations accessible to as many people
        as possible. It is precisely this vision that led to the creation of the
        new EVO HA series.
      </p>
    </section>
  );
}
