import React from 'react';
import Image from 'next/image';

// Full-card background image
const HERO_IMAGE =
  'https://afs-foiling.com/wp-content/uploads/2022/08/download-19.png';

export default function PlusImpactMast() {
  return (
    <main className="flex flex-col items-center justify-center w-full space-y-12">
      {/* --- Original Plus Impact Mast Section --- */}
      <section className="flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden w-full max-w-6xl mx-auto shadow-sm">
        {/* Left Image Section */}
        <div className="flex-1 bg-[#3da7d6] flex items-center justify-center p-6">
          <img
            src="https://afs-foiling.com/wp-content/uploads/2022/08/xxx.png"
            alt="Plus Impact Mast"
            className="max-w-full h-auto object-contain"
          />
        </div>

        {/* Right Text Section */}
        <div className="flex-1 bg-gray-100 flex flex-col justify-center p-10">
          <h2 className="text-4xl font-extrabold leading-tight text-gray-900">
            Schedule
          </h2>
          <p className="text-gray-600 mt-6 leading-relaxed">
            We have deliberately kept a little length to provide support on the front. It favors the start on the schedule and the inertia in the slightly soft conditions. It is possible to lean a little more on its rigging to lighten up and release the liveliness of the float.
          </p>
        </div>
      </section>

      {/* --- Full-size Hero Card with AFS Image --- */}
      <section className="relative w-full h-[70vh] max-w-6xl overflow-hidden rounded-lg shadow-xl mx-auto">
        {/* Full-size Background Image */}
        <Image
          src={HERO_IMAGE}
          alt="AFS Full Hero Image"
          fill
          className="object-cover"
          priority
        />
      </section>
    </main>
  );
}
