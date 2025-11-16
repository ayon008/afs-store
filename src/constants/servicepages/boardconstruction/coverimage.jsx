import React from "react";

const AdvancedBoardHero = () => {
  return (
    <div className="relative h-[90vh] w-full bg-black overflow-hidden">
      {/* BLURRED BACKGROUND */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-[4px]"
        style={{
          backgroundImage: "url('/images/service/bg_image-7.png')",
        }}
      ></div>

      {/* CONTENT LAYER (Text) */}
      <div className="absolute inset-0 z-10 flex flex-col p-4 sm:p-8 lg:p-12 text-white">
        <div className="mb-16 mt-auto">
          <h1
            className="font-bold tracking-tight"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: "70px",
              fontWeight: 700,
              lineHeight: "70px",
              color: "rgb(255, 255, 255)",
            }}
          >
            AFS and AFS Advanced board construction
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdvancedBoardHero;
