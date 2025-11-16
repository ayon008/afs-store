import React from "react";
import Image from "next/image";

// Hero image constant
const HERO_IMAGE = "https://afs-foiling.com/wp-content/uploads/2022/08/download-19.png";

// Schedule Section (no changes made to layout)
function ScheduleSection() {
  return (
    <section className="w-full max-w-6xl flex flex-col md:flex-row-reverse items-stretch rounded-2xl overflow-hidden mx-auto shadow-sm mb-20">
  {/* Left Text Section */}
  <div className="flex-1 bg-gray-100 flex flex-col justify-center p-10 md:border-l md:border-white">
    <h2 className="text-4xl font-extrabold leading-tight text-gray-900">
      Schedule
    </h2>
    <p className="text-gray-600 mt-6 leading-relaxed">
      Thanks to its length, the take-off is easy and brings a great tolerance in the maneuvers.
    </p>
  </div>

  {/* Right Image Section */}
  <div className="flex-1 bg-[#3da7d6] flex items-center justify-center p-6">
    <img
      src="https://afs-foiling.com/wp-content/uploads/2022/08/Groupe_de_masqu__3_-removebg-preview.png"
      alt="Schedule board"
      className="max-w-full h-auto object-contain"
    />
  </div>
</section>

  );
}

// Main Page Component
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] max-w-6xl overflow-hidden rounded-lg shadow-xl">
        <Image
          src={HERO_IMAGE}
          alt="AFS Full Hero Image"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Cards Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {/* Your right-left cards stay here untouched */}
      </section>

      {/* Schedule Section */}
      <ScheduleSection />
    </main>
  );
}
