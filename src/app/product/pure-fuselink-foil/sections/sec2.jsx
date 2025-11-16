// app/components/StatementHero.js
import React from "react";

export default function StatementHero() {
  return (
    <section className="bg-black w-full flex items-center justify-center px-6 py-20">
      <h2
        className="
          font-display
          text-center
          uppercase
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          leading-snug
          max-w-4xl
          text-transparent
          bg-clip-text
          bg-gradient-to-b from-gray-200 to-gray-500
          tracking-wide
        "
      >
        We developed the pure line with a single objective in mind:{" "}
        <br className="hidden md:block" />
        to give our riders every opportunity to shine on the world tour.
      </h2>
    </section>
  );
}
