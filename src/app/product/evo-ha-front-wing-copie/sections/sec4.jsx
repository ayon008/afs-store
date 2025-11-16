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
            EVO HA1000 – Long- <br />distance glide & instinctive <br />control.
          </h1>

          <h2
            className="leading-[55px] text-gray-400"
            style={{
              fontFamily: '"alliance no.2", sans-serif',
              fontSize: '90px',
              lineHeight: '90px',
              fontWeight: 400,
            }}
          >
            Stable, smooth, and natural <br />
            underfoot.
          </h2>
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
              Inspired by the Pure HA1100, this wing revisits the subtle
              balance between finesse, accessibility, and flying pleasure. With a
              surface area of 1000 cm², a wingspan of 1100 mm, and an aspect
              ratio of 12.1, it offers an exceptional glide/stability ratio.
              Ideal for intermediate to expert riders looking for an all-around
              foil for varied conditions. It will be perfect for freeride
              wingfoiling and challenging downwinds. Optimal speed range: 10–25
              knots.
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 pointer-events-none" />
    </section>
  );
}
