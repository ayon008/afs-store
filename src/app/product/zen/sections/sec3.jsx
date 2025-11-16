import React from 'react';

export default function ScheduleSection() {
  return (
    <section className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden max-w-5xl mx-auto shadow-sm mb-20">
      {/* Left Text Section */}
      <div className="flex-1 bg-gray-100 flex flex-col justify-center p-10 md:border-r md:border-white">
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
          src="https://afs-foiling.com/wp-content/uploads/2022/08/download-13.png"
          alt="Schedule board"
          className="max-w-full h-auto object-contain"
        />
      </div>
    </section>
  );
}
