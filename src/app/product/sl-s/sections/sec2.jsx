import Image from "next/image";

const BoardSizes = () => {
  const boardSpecs = [
    {
      name: "SL-S 95",
      volume: "95 L",
      length: "232 cm",
      width: "62 cm",
    },
    {
      name: "SL-S 115",
      volume: "115 L",
      length: "230 cm",
      width: "70 cm",
    },
  ];

  return (
    <section className="relative w-full min-h-screen bg-black text-white flex items-center overflow-hidden">
      {/* 1. Faint Background Image (same as HeroSection) */}
      <img
        src="https://afs-foiling.com/wp-content/uploads/2023/04/Group-45.png"
        alt="Abstract background pattern"
        className="absolute inset-0 w-full h-full object-cover opacity-20 z-0"
      />

      {/* 2. Gradient Overlay (dark panel on left side) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/90 to-transparent" />

      {/* 3. Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-8 sm:px-12 lg:px-24 py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: Text (title + specs) */}
          <div className="w-full lg:w-1/2 text-left">
            <h2 className="text-4xl md:text-5xl font-semibold mb-10">
              Two different sizes
            </h2>

            <div className="flex flex-col sm:flex-row gap-10 sm:gap-16">
              {boardSpecs.map((board) => (
                <div key={board.name}>
                  <h3 className="text-2xl font-semibold mb-4">{board.name}</h3>
                  <ul className="space-y-1 text-gray-300">
                    <li>Volume: {board.volume}</li>
                    <li>Length: {board.length}</li>
                    <li>Width: {board.width}</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2023/03/AHD_SLS.png.webp"
              alt="AHD SL-S 95 and 115 foiling boards"
              width={667}
              height={1024}
              className="w-auto h-auto max-w-full max-h-[600px] lg:max-h-[700px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoardSizes;
