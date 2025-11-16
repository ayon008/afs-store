"'use client';"


export default function SquareTailSection() {
  return (
    <section className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden">
      {/* Left image */}
      <img
        src="https://afs-foiling.com/wp-content/uploads/2023/06/get-up-18.png"
        alt="Left board"
        className="absolute left-0 top-1/2 -translate-y-1/2 w-[45vw] max-w-none object-contain"
      />

      {/* Right image */}
      <img
        src="https://afs-foiling.com/wp-content/uploads/2023/06/get-up-10-2.png"
        alt="Right board"
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[45vw] max-w-none object-contain"
      />

      {/* Text content */}
      <div className="text-center px-4 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-[#c79035] mb-4">
          Square tail
        </h2>
        <p className="text-base md:text-lg font-semibold text-black">
          It will help generate speed in soft or small waves.
        </p>
        <p className="text-base md:text-lg text-black mt-1">
          It also aids flotation and improves stability.
        </p>
      </div>
    </section>
  );
}
