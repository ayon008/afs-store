"use client";

import React from "react";
import Image from "next/image";

const Sec1 = () => {
  const LEFT_SIDE_IMAGE =
    "https://afs-foiling.com/wp-content/uploads/2024/12/H_tail.png";

  return (
    <div className="min-h-[120vh] flex items-center justify-center relative overflow-visible">
      <section className="w-full flex flex-col md:flex-row items-center justify-between pt-40 md:pt-60">
        {/* === LEFT SECTION: Fullscreen Image === */}
        <div className="relative flex-1 flex justify-start items-center overflow-visible mt-20">
          <Image
            src={LEFT_SIDE_IMAGE}
            alt="H Tail Foil"
            width={3000}
            height={3000}
            className="object-contain w-auto max-w-none select-none absolute left-[-100px] md:left-[-150px] lg:left-[-200px]" // moved more right
            priority
            unoptimized
          />
        </div>

        {/* === RIGHT SECTION: Text === */}
        <div className="relative z-30 flex-1 px-6 sm:px-12 md:px-16 lg:px-20 py-20 text-center md:text-left">
          {/* Heading */}
          <h1
            className="mb-8 md:mb-10"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "50px",
              fontWeight: 700,
              lineHeight: "55px",
              color: "#ffffff",
            }}
          >
            Push Your Limits
            <br /> with The Pulse
          </h1>

          {/* First Paragraph */}
          <p
            className="mb-6 tracking-wide"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "32px",
              fontWeight: 400,
              lineHeight: "33.6px",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            THE PULSE IS A FOIL BOARD <br />
            DESIGNED FOR DEMANDING WAKE, <br />
            KITE, AND TOW FOIL <br />
            RIDERS.
          </p>

          {/* Second Paragraph */}
          <p
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "18px",
              fontWeight: 500,
              lineHeight: "21.6px",
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "90%",
            }}
          >
            Its molded carbon construction offers <br />
            unmatched responsiveness and connectivity <br />
            with the foil, for a unique gliding sensation. <br />
            Intuitive and high-performance, it adapts to all riding styles.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Sec1;
