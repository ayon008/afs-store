"use client";

import React, { useState } from "react";
import Popup from "./popup";

const CustomerCard = ({ title, description, color = "#1d98ff" }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div
        className="relative flex flex-col lg:flex-row bg-[#f9f9f9] rounded-md overflow-hidden shadow-sm group transition-all duration-500 ease-in-out
                  w-full sm:w-[340px] md:w-[380px] lg:w-[420px] h-[220px] sm:h-[240px] md:h-[260px] lg:h-[280px]"
      >
        {/* Text Content */}
        <div className="flex-1 flex flex-col justify-center px-4 py-3 z-10">
          <h2 className="text-sm sm:text-base font-extrabold tracking-wide uppercase mb-2 text-[#1a1a1a]">
            {title}
          </h2>
          <p className="text-[12px] sm:text-sm text-[#444] leading-relaxed">
            {description}
          </p>
        </div>

        {/* Color placeholder */}
        <div
          className="w-full lg:w-1/2 h-[100px] sm:h-[120px] md:h-full"
          style={{ backgroundColor: color }}
        ></div>

        {/* Overlay */}
        <div
          onClick={() => setIsPopupOpen(true)}
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center cursor-pointer"
        >
          <span
            className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-500 group-hover:after:w-full"
            style={{
              fontFamily: '"Alliance No.2", sans-serif',
              fontSize: "14px",
              fontWeight: 600,
              lineHeight: "19px",
              color: "#fff",
              letterSpacing: "1px",
              textTransform: "uppercase",
              paddingBottom: "4px",
            }}
          >
            View All
          </span>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          title={title}
          description={description}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
};

export default CustomerCard;
