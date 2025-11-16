// app/components/BulbNoseSection.jsx

import Image from "next/image";

export default function BulbNoseSection() {
  return (
    <section className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Background Image of the Board */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[900px] max-w-[95%]">
        <Image
          src="https://afs-foiling.com/wp-content/uploads/2023/12/image-5.png"
          alt="AFS board bulb nose"
          width={1000}
          height={600}
          className="object-contain w-full h-auto"
          priority
        />
      </div>

      {/* Text Section */}
      <div className="absolute left-[10%] md:left-[12%] top-1/2 -translate-y-1/2 text-white max-w-md px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">This bulb nose</h2>
        <p className="uppercase text-sm md:text-base leading-relaxed tracking-wide text-gray-200">
          The cleverly added volume on the nose helps you to avoid loading the
          oven when a volume close to its weight is wrinkled.
        </p>
      </div>
    </section>
  );
}
