// components/Table.jsx
"use client";

import React from "react";

const Table = ({ title, subTitle, headers = [], data = [] }) => {
  const TableCell = ({ content, isHeader = false, width }) => (
    <div
      className={`
        ${width}
        flex-shrink-0
        px-2 sm:px-3
        ${isHeader ? "h-[80px] pt-0.5" : "h-[55px] flex items-center"}
      `}
      style={{
        fontFamily: '"Alliance No.2", sans-serif',
        fontSize: isHeader ? "14px" : "20px",
        fontWeight: 600,
        lineHeight: isHeader ? "14px" : "20px",
        color: isHeader ? "rgb(153,153,153)" : "rgb(17,17,17)",
      }}
    >
      {content}
    </div>
  );

  return (
    <div className="py-4 bg-white font-sans text-gray-900">
      <div className="w-full">
        {/* Titles */}
        {title && <h1 className="text-2xl sm:text-3xl font-bold mb-6">{title}</h1>}
        {subTitle && <h2 className="text-xl sm:text-2xl font-semibold mb-4">{subTitle}</h2>}

        {/* Table */}
        <div className="relative w-full overflow-x-auto">
          <div className="inline-block min-w-full shadow-inner">
            {/* Header */}
            <div className="flex border-b border-gray-900 border-opacity-50 bg-gray-50">
              {headers.map((header) => (
                <TableCell
                  key={header.key}
                  isHeader
                  width={header.width}
                  content={
                    <div className="flex flex-col justify-end h-full">
                      <span className="mb-0.5">
                        {header.label}
                        {header.unit && <sup className="ml-1 font-bold">{header.unit}</sup>}
                      </span>
                      {header.subLabel && (
                        <span className="text-[10px] text-gray-500 font-normal mt-[-2px]">
                          {header.subLabel}
                        </span>
                      )}
                    </div>
                  }
                />
              ))}
            </div>

            {/* Data Rows */}
            {data.map((row, idx) => (
              <div
                key={row.model || idx}
                className={`flex ${idx < data.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                {headers.map((header) => (
                  <TableCell key={header.key} width={header.width} content={row[header.key]} />
                ))}
              </div>
            ))}

            {/* Subtle horizontal scroll indicator */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100">
              <div className="h-full bg-gray-400 w-1/4 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
