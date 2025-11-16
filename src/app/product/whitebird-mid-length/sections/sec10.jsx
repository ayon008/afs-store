import Image from 'next/image';
import React from 'react';

// A helper component for the choice tables to avoid repetition
const ChoiceTable = ({ title, headers, rows }) => (
  <div className="flex-1 min-w-[300px]">
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <table className="w-full text-left">
      <thead>
        <tr className="border-b border-gray-400">
          {headers.map((header, index) => (
            <th 
              key={index} 
              className="pb-2 pr-4 text-sm font-normal text-gray-200"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td 
                key={cellIndex} 
                className="pt-2 pr-4 font-semibold"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default function Section10() {
  // Data for the tables
  const wingFoilData = {
    title: "Wing foil program",
    headers: ["Level", "≤80kg", "≥80kg"],
    rows: [
      ["Beginner", "WB 6'8", "WB 6'8"],
      ["Intermediate / expert", "WB 5'8", "WB 5'8"]
    ]
  };

  const supFoilData = {
    title: "Sup foil / Downwind program",
    headers: ["Level", "≤70kg", "≥70kg"],
    rows: [
      ["Beginner", "WB 7'8", "WB 8'2"],
      ["Intermediate / expert", "WB 6'6", "WB 6'6"]
    ]
  };

  return (
    <section className="relative min-h-screen text-white">
      {/* Sticky background image with lower z-index */}
      <div className="sticky top-0 w-full h-screen z-0">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/04/image-15-4.png"
          alt="Foil surfer on a wave"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
          className="z-0"
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black opacity-30 z-10 pointer-events-none"></div>
      </div>

      {/* Content stays above image and overlay */}
      <div className="absolute bottom-0 left-0 z-20 w-full max-w-7xl px-6 md:px-12 py-16">
        <div className="max-w-4xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-10">
            How to choose?
          </h2>
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            <ChoiceTable 
              title={wingFoilData.title}
              headers={wingFoilData.headers}
              rows={wingFoilData.rows}
            />
            <ChoiceTable 
              title={supFoilData.title}
              headers={supFoilData.headers}
              rows={supFoilData.rows}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
