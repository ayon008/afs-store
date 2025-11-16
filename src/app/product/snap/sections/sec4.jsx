"use client";

import Image from "next/image";
import React from "react";

export default function App() {
  return (
    <>
           <div className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:pl-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-[#00528b]">
              One Shot
              <br />
              Sandwich PVC
            </h1>
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              The AFS Snap is built on a PVC sandwich base. A unique
              manufacturing process in which all layers of fabrics,
              reinforcements and housings are applied in a double-shell mold,
              then baked in a process that ensures ideal polymerization of the
              resins for perfect reproduction and an optimal weight/solidity
              ratio.
            </p>
          </div>
          {/* Right Side - Board Image with Zoomed Section */}
          <div className="relative flex items-center justify-center bg-transparent">
            <div className="flex flex-col items-center justify-center relative bg-transparent">
              {/* Main Board Image */}
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2023/06/1M7A0560-%D0%A3%D0%BB%D1%83%D1%87%D1%88%D0%B5%D0%BD%D0%BE-NR-2.png"
                alt="AFS Snap Foiling Board"
                width={1200}
                height={1200}
                className="mx-auto w-auto max-w-[700px] h-auto rounded-lg shadow-2xl"
                priority
              />

              {/* Zoomed Section Overlay */}
              <div className="absolute bottom-8 right-8 w-72 h-72 lg:w-96 lg:h-96 pointer-events-none flex items-center justify-center bg-transparent">
                {/* Dashed Outline Circle */}
                <div className="absolute inset-0 rounded-full border-4 border-dashed border-[#003087] scale-90" />

                {/* Zoomed Close-up Image */}
                <Image
                  src="https://afs-foiling.com/wp-content/uploads/2023/06/image-7247-1.png"
                  alt="Zoomed section of board construction"
                  width={800}
                  height={800}
                  className="absolute inset-0 w-full h-full rounded-full object-cover shadow-2xl border-none"
                />
              </div>

              {/* Outline rectangle image fully visible */}
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2023/06/Rectangle-4.png"
                alt="Outline"
                width={300}
                height={300}
                className="absolute bottom-12 right-12 opacity-100 pointer-events-none"
              />
            </div>

            {/* Resin Info */}
            <div className="absolute -bottom-8 -right-4 lg:bottom-4 lg:right-8  p-6 rounded-lg shadow-xl max-w-xs">
              <p className="text-sm lg:text-base text-gray-800 leading-tight">
                <span className="font-bold text-[#00528b]">
                  THE RESIN USED TO BUILD OUR BOARDS IS A BIO-SOURCED EPOXY:
                </span>
                <br />
                <span className="text-[#00528b] font-bold">
                  83% OF MOLECULES FROM PLANT SOURCES.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
