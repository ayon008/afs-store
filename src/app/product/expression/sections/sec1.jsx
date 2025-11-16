import React from 'react';
export default function WindsurfingSection() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="text-center mt-12 w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Dreamy waves or challenging waters,
          <br />
          surf any <br />type of conditions!
        </h1>
        <p className="text-gray-400 text-lg mt-6 max-w-3xl mx-auto">
          Our AHD Expression boards have a modern shape that combines a bit of length to improve planning and drive with a scoop line <br />
          and hull that have been worked on to make them responsive and easy to handle in the turns.
        </p>
      </div>

      <div className="bg-[#292929] text-white rounded-lg mt-20 py-24 px-6 md:px-12 w-full max-w-6xl text-center">
        <h2 className="text-5xl font-extrabold mb-8">OSS Double  <br /> Sandwich   <br />carbon kevlar</h2>
        <p className="text-gray-300 max-w-3xl mx-auto text-base leading-relaxed">
          From 6.3 kg upwards, we follow a unique manufacturing process during which all layers of fabric, reinforcements and housings are applied in a double-shell mold, then baked using a process that allows ideal polymerization of the resins for perfect reproduction and an optimal weight/solidity ratio. The resin used for the construction of our boards is a biosourced epoxy SR GreenPoxy (more than 33% of the molecules come from plant sources)
        </p>
      </div>
    </div>
  );
}
