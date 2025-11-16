import React from 'react';
export default function WindsurfingSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center mt-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Want to discover windsurfing
          <br />
          with your family?
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
          The good glide length and large width gives the AHD ZEN a stability that will allow you to start windsurfing easily.
        </p>
      </div>

      <div className="bg-[#292929] text-white rounded-lg mt-20 py-24 px-6 md:px-12 w-full max-w-6xl text-center">
        <h2 className="text-5xl font-extrabold mb-8">OSS Wood</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed">
          We follow a unique manufacturing process during which all layers of fabrics, reinforcements, and casings are applied in a double-shell mold, then baked in a process that allows for ideal polymerization of resins for perfect reproduction and optimal weight/solidity ratio. The resin used for the construction of our boards is a biosourced epoxy SR GreenPoxy (more than 33% of the molecules come from plant sources)
        </p>
      </div>
    </div>
  );
}
