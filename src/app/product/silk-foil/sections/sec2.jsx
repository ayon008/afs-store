"use client";

import Image from "next/image";

export default function TuberclesSection() {
  return (
    <section className="relative w-full h-screen bg-black text-center flex flex-col justify-center items-center overflow-hidden">
      {/* Text Content */}
      <div className="max-w-3xl px-6 mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Tubercles and Winglets in Action
        </h2>
        <p className="text-lg text-gray-300 leading-relaxed">
          The use of tubers (bumps) combined with winglets optimizes low range, stability and control, even in the roughest, most aerated waters. You have maximum confidence in dynamically carving “tip out”, while maintaining total control.
        </p>
      </div>

      {/* Center Image */}
      <div className="flex justify-center items-center">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2024/03/line_wrap.png"
          alt="Tubercles and Winglets Illustration"
          width={1200}
          height={600}
          className="object-contain w-[90%] md:w-[70%] lg:w-[60%]"
          priority
        />
      </div>
    </section>
  );
}
