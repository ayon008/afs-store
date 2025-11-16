'use client';

import Image from "next/image";
import { useState } from "react";

const FuselinkSection = () => {
  const row1 = [
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800HM80.png", label: "PURE800 + HM80" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800HM85.png", label: "PURE800 + HM85" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800HR80.png", label: "PURE800 + HR80" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800UHM75.png", label: "PURE800 + UHM75" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800UHM80.png", label: "PURE800 + UHM80" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800UHM85.png", label: "PURE800 + UHM85" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure800UHM95.png", label: "PURE800 + UHM95" },
  ];

  const row2 = [
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100HM80.png", label: "PURE1100 + HM80" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100HM85.png", label: "PURE1100 + HM85" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100UHM75.png", label: "PURE1100 + UHM75" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100UHM80.png", label: "PURE1100 + UHM80" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100UHM85.png", label: "PURE1100 + UHM85" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100UHM95.png", label: "PURE1100 + UHM95" },
    { src: "https://afs-foiling.com/wp-content/uploads/2024/03/Pure1100HR80.png", label: "PURE1100 + HR80" },
  ];


  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Utility to render a single row
  const renderRow = (data, rowId) => (
    <div
      className="flex justify-center gap-10 mt-10 flex-wrap"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {data.map((item, i) => {
        const index = `${rowId}-${i}`;
        const isHovered = hoveredIndex === index;
        const rowHovered =
          hoveredIndex && hoveredIndex.startsWith(`${rowId}-`);

        return (
          <div
            key={i}
            className={`relative transition-opacity duration-300 ${
              rowHovered && !isHovered ? "opacity-30" : "opacity-100"
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            <div className="w-[220px] h-[220px] flex items-center justify-center relative">
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-contain transition-opacity duration-300"
              />
            </div>

            {/* Hover label */}
            {isHovered && (
              <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-2">
                {item.label.split(" + ").map((part, idx) => (
                  <span
                    key={idx}
                    className="bg-white text-black text-sm font-semibold px-3 py-1 rounded-full"
                  >
                    {part}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="bg-black text-white py-24 text-center relative overflow-hidden">
      {/* First Row */}
      {renderRow(row1, "row1")}

      {/* Center Text */}
      <h2
        className="mt-20"
        style={{
          fontFamily: '"alliance no.2", sans-serif',
          fontSize: "50px",
          fontWeight: 700,
          lineHeight: "55px",
          color: "rgb(255, 255, 255)",
        }}
      >
        You can install any AFS fuselink mast <br /> and stabilizers.
      </h2>

      {/* Second Row */}
      {renderRow(row2, "row2")}
    </section>
  );
};

export default FuselinkSection;
