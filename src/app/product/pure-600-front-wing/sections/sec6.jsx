// components/DevelopmentProcess.js

import React from "react";

const DevelopmentProcess = () => {
  return (
    <section className="bg-black text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title and Description */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            How did we do it?
          </h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
            Designing a foil is a constant back-and-forth between lab and water.
            Our designers shape the future; our riders stress-test it in every
            condition. Then, together, they fine-tune until nothing's left to
            chance.
          </p>
        </div>

        {/* Process Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          {/* Left Text */}
          <div className="md:col-span-1 text-base text-gray-300 leading-relaxed">
            For almost a year, Axel and our R&D team worked in an ongoing loop:
          </div>

          {/* Cards + Right Text Section */}
          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Step 1 */}
            <div className="p-6 bg-red-900/70 hover:bg-red-900 transition duration-300 rounded-lg">
              <h3 className="text-xl font-bold mb-2">On-water testing</h3>
              <p className="text-sm text-gray-200">
                Axel pushed every prototype to the edge – from high-air freestyle
                to flat-out speed runs.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 bg-red-900/70 hover:bg-red-900 transition duration-300 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Feedback loops</h3>
              <p className="text-sm text-gray-200">
                Every sensation, every micro-adjustment went back to the engineers,
                who refined profiles, stiffness, and geometry.
              </p>
            </div>

            {/* Right Side Text (takes space of 3rd card) */}
            <div className="p-6 text-sm text-gray-300 flex flex-col justify-center bg-transparent">
              <p>
                Dozens of prototypes later, we reached the{" "}
                <span className="font-semibold text-white">
                  PURE 600 PRO MODEL
                </span>{" "}
                – the first foil co-signed by an APS young champion and our R&D
                team.
              </p>
              <p className="mt-3">
                The result? A competition-ready foil, accessible to anyone
                chasing ultimate performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopmentProcess;
