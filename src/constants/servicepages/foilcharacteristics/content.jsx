"use client";

import React from "react";
import DynamicTable from "./table";
import tableData from "./tabledata";

export default function AllTablesPage({ filter = "ALL" }) {
  // Helper function to create header objects in the required format
  const formatHeaders = (headers) => [
    {
      key: "model",
      label: "Model",
      width: "min-w-[150px]",
    },
    ...headers.map((header) => ({
      key: header.toLowerCase().replace(/[()\/\s]/g, "_"),
      label: header,
      width: "min-w-[150px]",
    })),
  ];

  // Helper function to format data
  const formatData = (rows, headers) =>
    rows.map((row) => {
      const formattedRow = { model: row.model };
      if (Array.isArray(row.values)) {
        row.values.forEach((value, index) => {
          const key = headers[index].toLowerCase().replace(/[()\/\s]/g, "_");
          formattedRow[key] = value;
        });
      } else {
        headers.forEach((header) => {
          const key = header.toLowerCase().replace(/[()\/\s]/g, "_");
          formattedRow[key] = row[header] || "";
        });
      }
      return formattedRow;
    });

  // Format foil data
  const foilTables = tableData.foil.map((table) => ({
    id: table.productName,
    title: table.productName,
    type: "FOIL",
    headers: formatHeaders(table.headers),
    data: formatData(table.rows, table.headers),
  }));

  // Format board data
  const boardTables = tableData.board.map((table) => ({
    id: table.title,
    title: table.title,
    type: "BOARD",
    headers: formatHeaders(table.headers),
    data: formatData(table.rows, table.headers),
  }));

  // Format previous range data
  const previousRangeTables = tableData.previousRange[0].tables.map((table) => ({
    id: table.name,
    title: table.name,
    type: "PREVIOUS RANGE",
    headers: formatHeaders(table.headers),
    data: formatData(table.rows, table.headers),
  }));

  // Filter tables based on selected tab
  const getFilteredTables = () => {
    switch (filter) {
      case "FOIL":
        return foilTables;
      case "BOARD":
        return boardTables;
      case "PREVIOUS RANGE":
        return previousRangeTables;
      case "ALL":
      default:
        return [...foilTables, ...boardTables, ...previousRangeTables];
    }
  };

  const filteredTables = getFilteredTables();

  return (
    <div className="w-full px-6 sm:px-8 lg:px-10">
      {filter !== "ALL" && (
        <h2
          className="text-3xl font-bold mb-8"
          style={{ fontFamily: '"alliance no.2", sans-serif' }}
        >
          {filter === "PREVIOUS RANGE" ? "Previous Range" : `${filter} Range`}
        </h2>
      )}
      <div className="space-y-8">
        {filteredTables.map((table) => (
          <div key={table.id} className="overflow-x-auto">
            <DynamicTable
              title={table.title}
              headers={table.headers}
              data={table.data}
            />
          </div>
        ))}
      </div>
    </div>
  );
}