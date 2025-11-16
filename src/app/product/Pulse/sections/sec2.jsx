import React from "react";

const Sec2 = () => {
  const textContent = {
    title: "Carbon Construction",
    description:
      "High-tech molded carbon construction with double longitudinal carbon stringers for maximum rigidity and responsiveness. Double carbon reinforcement on the board's rail to withstand the shocks of transport by boat.",
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#0c0c0c] text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage:
            "url('https://afs-foiling.com/wp-content/uploads/2024/12/3.-Carbon.png')",
        }}
      ></div>

      {/* Bottom-Right Decorative Image with Black BG */}
      <div className="absolute bottom-10 right-4 sm:right-8 md:right-14 lg:right-16">
        <div className="relative bg-black rounded-lg overflow-hidden">
          <img
            src="https://afs-foiling.com/wp-content/uploads/2024/12/H_tail-1-600x600.png.webp"
            alt="Tail Component"
            className="w-[180px] sm:w-[220px] md:w-[300px] lg:w-[380px] xl:w-[420px] opacity-90 object-contain select-none pointer-events-none"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full flex flex-col md:flex-row items-start md:items-end justify-between px-6 sm:px-10 md:px-20 pb-16 md:pb-20 h-auto md:h-[90vh] z-10">
        {/* Text Section */}
        <div className="md:w-3/5 lg:w-7/12 text-left space-y-4 sm:space-y-5 mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            {textContent.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-full md:max-w-lg leading-relaxed">
            {textContent.description}
          </p>
        </div>

        {/* Right Spacer for Layout Balance */}
        <div className="hidden md:block md:w-2/5 lg:w-5/12 h-[auto]"></div>
      </div>
    </section>
  );
};

export default Sec2;
