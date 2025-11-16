// components/UHMCopy.jsx

import React from 'react';

const UHMCopy = () => {
  const frenchFlagUrl =
    "https://afs-foiling.com/wp-content/uploads/2024/02/Frame-23.svg";
  const backgroundTextureUrl =
    "https://afs-foiling.com/wp-content/uploads/2024/06/17820231_SL-092619-23740-39-1.png";

  return (
    <div className="relative flex items-center justify-center h-screen w-full bg-black overflow-hidden">
      {/* Background texture (full width, fixed height, centered vertically) */}
      <div
        className="absolute top-1/2 left-0 w-full -translate-y-1/2"
        style={{
          backgroundImage: `url('${backgroundTextureUrl}')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "100% auto", // full width, natural height
          height: "700px", // same as original texture height
        }}
      />

      {/* Top & bottom fades */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Content */}
      <div className="z-10 text-center max-w-2xl px-4 text-white">
        <p className="flex items-center justify-center text-xs tracking-widest uppercase mb-4 text-gray-300">
          MADE IN FRANCE
          <img
            src={frenchFlagUrl}
            alt="French Flag"
            className="w-4 h-auto ml-2"
          />
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          UHM Carbon Construction
        </h1>

        <p className="text-sm sm:text-base font-light px-2 sm:px-4 md:px-8">
          Use of <strong>UHM (Ultra High Modulus) carbon</strong>. Essential for
          generating the necessary <strong>rigidity</strong> on foils combining{" "}
          <strong>large wingspan</strong> and very <strong>thin profile</strong>.
        </p>
      </div>
    </div>
  );
};

export default UHMCopy;
