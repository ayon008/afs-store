'use client';

import Image from 'next/image';

export default function App() {
  return (
    <div className="relative h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center gap-8 md:gap-16 scale-75 md:scale-100">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative"
            style={{
              transform: `translateX(${i * -80}px) translateZ(${-i * 100}px) rotateY(${i * -15}deg)`,
              transformStyle: 'preserve-3d',
              filter: `brightness(${1 - i * 0.2})`,
            }}
          >
            <Image
              src="https://afs-foiling.com/wp-content/uploads/2025/01/Group-1-1.png.webp"
              alt={`Wing ${i + 1}`}
              width={800}
              height={600}
              className="relative z-10 drop-shadow-2xl"
              priority
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center text-white z-20">
        <p className="text-sm opacity-70 mb-2">Available sizes</p>
        <h2 className="text-5xl md:text-7xl font-bold">3m, 4m, 5m and 6m.</h2>
      </div>

      
    </div>
  );
}