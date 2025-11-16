import React from 'react';
import Image from 'next/image';

const DosageSection = () => {
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2022/08/download-18.png";

  return (
    <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto">
      
      {/* 1. Text Column */}
      <div className="bg-gray-100 rounded-2xl p-10 flex flex-col justify-center">
        <h2 className="text-5xl font-extrabold text-black mb-6 leading-tight">
          The <br />
          proper <br />
          dosage
        </h2>
        <p className="text-base text-gray-700 leading-relaxed">
          The correct distribution of the scoop determines the behavior of
          the float. Too tense, and the float takes off early but doesn't turn or
          accept the dip. Too curved, and the float only expresses itself in the
          trough of the wave, making it very difficult to plan ahead or to go fast.
          The right understanding makes the Expression a pure wave floater,
          fast and radical. Timeless.
        </p>
      </div>

      {/* 2. Image Column */}
      <div className="relative rounded-2xl overflow-hidden h-96 md:h-auto">
        <Image
          src={imageUrl}
          alt="Close-up of a colorful windsurfing board"
          fill
          className="object-cover"
        />
      </div>

    </div>
  );
};

export default DosageSection;