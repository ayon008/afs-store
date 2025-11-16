"use client";
import Image from "next/image";

export default function EvoHA1000Section() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-24 space-y-12">
        {/* Headings - Pushed more to the right */}
        <div className="space-y-6 ml-12 lg:ml-24">
          <h1
            className="leading-[55px]"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '50px',
              fontWeight: 700,
              lineHeight: '55px',
              color: 'rgb(255, 255, 255)',
            }}
          >
            EVO HA750 –<br />Responsiveness and early <br />lift.
          </h1>

  
        </div>

        {/* Images + Description */}
        <div className="flex flex-col lg:flex-row items-start lg:items-start gap-12">
          {/* Left Images - Slightly smaller */}
          <div className="flex flex-col space-y-4 lg:space-y-6 w-full lg:w-2/3">
            <div className="relative w-full h-[100px] lg:h-[130px]">
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2025/05/HA750_0001-7.png.webp"
                alt="EVO HA1000 Wing Top"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="relative w-full h-[100px] lg:h-[130px]">
              <Image
                src="https://afs-foiling.com/wp-content/uploads/2025/05/HA750_0001-7.png.webp"
                alt="EVO HA1000 Wing Bottom"
                fill
                className="object-contain opacity-60 mix-blend-lighten"
                priority
              />
            </div>
          </div>

          {/* Right Description */}
          <div className="space-y-4 max-w-lg">
            <p
              className="text-base leading-[26px]"
              style={{
                fontFamily: '"alliance no.2", sans-serif',
                fontSize: '20px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              Developed from the Pure HA800, this sleek wing—with a wingspan of 1000 mm and an aspect ratio of 13.3—has been designed for improved maneuverability and planing performance. Its new, more streamlined, modern outline gives it exhilarating responsiveness without sacrificing flying comfort. It excels in challenging conditions and dynamic freeride sessions. Its new, wider low-end range allows for an earlier takeoff than before, without compromising the upper end of the spectrum: it’s a wing that takes off early and continues to accelerate endlessly. Optimal speed range: 14–30 knots.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
    </section>
  );
}
