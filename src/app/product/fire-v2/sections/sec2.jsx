// app/components/CompactShapeSection.jsx

import Image from "next/image";

export default function CompactShapeSection() {
  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Top Image */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] max-w-[95%]">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/11/image-10-1.png.webp"
          alt="Top board"
          width={900}
          height={300}
          className="w-full object-contain"
          priority
        />
      </div>

      {/* Bottom Image */}
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[900px] max-w-[95%]">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/11/image-11-1.png.webp"
          alt="Bottom board"
          width={900}
          height={300}
          className="w-full object-contain"
          priority
        />
      </div>

      {/* Center Text */}
      <div className="absolute text-center text-white px-4">
        <h2 className="text-5xl md:text-6xl font-bold mb-4">Compact shape</h2>

        <p className="uppercase tracking-wide font-semibold text-sm md:text-base mb-6 max-w-2xl mx-auto">
          Don’t get anything under your feet! The Fire V2’s compact shape means it
          takes up as little space as possible in flight.
        </p>

        <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
          This compactness provides better pumping performance and a lighter feel
          when cornering. An ideal board for heavy-duty riding or a lightweight
          freeride session.
        </p>
      </div>
    </section>
  );
}
