import React from 'react';


export default function PlusImpactMast() {
  return (
    <section className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden max-w-5xl mx-auto shadow-sm">
      {/* Left Image Section */}
      <div className="flex-1 bg-[#3da7d6] flex items-center justify-center p-6">
        <img
          src="https://afs-foiling.com/wp-content/uploads/2022/08/download-13.png"
          alt="Plus Impact Mast"
          className="max-w-full h-auto object-contain"
        />
      </div>

      {/* Right Text Section */}
      <div className="flex-1 bg-gray-100 flex flex-col justify-center p-10">
        <h2 className="text-4xl font-extrabold leading-tight text-gray-900">
          Plus <br /> impact <br /> mast
        </h2>
        <p className="text-gray-600 mt-6 leading-relaxed">
          Entirely padded and reinforced on the parts of the board that are used
          by beginners (nose and rails), these boards ensure maximum comfort
          and pleasure for beginners.
        </p>
      </div>
    </section>
  );
}
