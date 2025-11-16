'use client';
import React from 'react';

export default function Sec3() {
  return (
    <section className="bg-black text-white w-full font-sans">
      <div className="min-h-screen w-full flex items-center justify-center py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
          <div className="lg:col-span-1 flex justify-center lg:justify-end lg:-mt-24">
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/03/image-30.png"
              alt="Fuselage and mast connection detail"
              className="w-full h-auto object-contain rounded-md"
              onError={(e) => {
                e.currentTarget.src =
                  'https://placehold.co/400x600/111111/eeeeee?text=Image+1';
                e.currentTarget.onerror = null;
              }}
            />
          </div>

 <div className="lg:col-span-2 flex flex-col items-center text-center">
            <h2
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: '50px',
                fontWeight: 500,
                lineHeight: '55px',
                color: 'rgb(255,255,255)',
              }}
              className="mb-6"
            >
              Fuselage connection
            </h2>
            <p
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '28.8px',
                color: 'rgb(255,255,255)',
              }}
              className="mb-4 max-w-2xl"
            >
              The Pure HA800 and HA1100 benefit from the Fuselink innovation,
              which considerably improves stiffness, weight and glide. Handling
              is improved with the mast 1cm closer to the front foil.
            </p>
            <p
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: '24px',
                fontWeight: 700,
                lineHeight: '28.8px',
                color: 'rgb(255,255,255)',
              }}
              className="max-w-2xl"
            >
              We've shortened the fuselage by 2 cm to further improve
              manoeuvrability while maintaining optimum control. These two HA
              foils offer excellent manoeuvrability, especially at moderate
              speeds.
            </p>
          </div>

          <div className="lg:col-span-1 flex justify-center lg:justify-start lg:mt-24">
            <img
              src="https://afs-foiling.com/wp-content/uploads/2024/03/image-31.png"
              alt="Foil and fuselage connection detail"
              className="w-full h-auto object-contain rounded-md"
              onError={(e) => {
                e.currentTarget.src =
                  'https://placehold.co/400x400/111111/eeeeee?text=Image+2';
                e.currentTarget.onerror = null;
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
