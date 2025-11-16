import Image from "next/image";

// Define image URLs in a configuration object for better maintainability
const IMAGES = {
  pole: "https://afs-foiling.com/wp-content/uploads/2024/03/B_PureV2900_0004-2.png",
  wing: "https://afs-foiling.com/wp-content/uploads/2024/03/Vector-3-1.png",
  screw: "https://afs-foiling.com/wp-content/uploads/2024/03/screw-1.png",
};

export default function Section5() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white p-8 md:p-16 lg:p-24 overflow-hidden">
      {/* 1. Top Left Text Content */}
      <div className="relative z-30 max-w-xs">
        <h2 className="text-4xl lg:text-5xl font-bold mb-6">
          2 stab positions
        </h2>
        <p className="text-base lg:text-lg text-gray-300">
          Since the Pure's program is to be a versatile foil
          that performs well in all disciplines, we've kept
          two stab positions.
        </p>
      </div>

      {/* 2. Central Image Assembly */}
      <div className="absolute inset-0 grid place-items-center z-10">
        <div className="relative w-[1058px] h-[1000px] flex flex-col items-center justify-center scale-50 sm:scale-75 md:scale-90 lg:scale-100">
          
          {/* Pole (Middle Layer) */}
          <Image
            src={IMAGES.pole}
            alt="Foil pole"
            width={200}
            height={800}
            className="absolute left-1/2 -translate-x-1/2 top-[100px] z-20"
            priority
            style={{ objectFit: 'contain' }}
            onError={(e) => {
              console.error('Pole image error:', e);
            }}
          />

          {/* Wings (Background Layer) */}
          <Image
            src={IMAGES.wing}
            alt="Top wing position"
            width={1058}
            height={162}
            className="absolute left-0 z-10 top-[350px] mix-blend-multiply opacity-95"
            priority
          />
          <Image
            src={IMAGES.wing}
            alt="Bottom wing position"
            width={1058}
            height={162}
            className="absolute left-0 z-10 top-[550px] mix-blend-multiply opacity-95"
            priority
          />

          {/* Screws (Top Layer) */}
          <Image
            src={IMAGES.screw}
            alt="Screw"
            width={40}
            height={40}
            className="absolute left-1/2 -translate-x-1/2 z-30 top-[460px]"
          />
          <Image
            src={IMAGES.screw}
            alt="Screw"
            width={40}
            height={40}
            className="absolute left-1/2 -translate-x-1/2 z-20 top-[510px]"
          />
          <Image
            src={IMAGES.screw}
            alt="Screw"
            width={40}
            height={40}
            className="absolute left-1/2 -translate-x-1/2 z-20 top-[560px]"
          />
        </div>
      </div>

      {/* 3. Bottom Right Text Content */}
      <div className="absolute bottom-16 md:bottom-24 lg:bottom-48 right-8 md:right-16 lg:right-24 z-30 max-w-xs">
        <p className="text-base lg:text-lg text-gray-300">
          In the forward position, the foil is very playful and lively on the pitch
          axis, which makes it very efficient when pop, whereas in the backward
          position, the foil is more fixed on this axis and favors control in races
          or on speed runs.
        </p>
      </div>
    </section>
  );
}
