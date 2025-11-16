 import React from 'react';

// This is the component for the hero section
const HeroSection = () => {
  return (
    <>
      <main
        className="relative flex h-screen items-center justify-center bg-cover bg-center"
        // Use the provided background image URL
        style={{
          backgroundImage:
            "url('https://afs-foiling.com/wp-content/uploads/2023/10/0929-1-1.png')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Text Content */}
        <div className="relative z-10 max-w-3xl p-8 text-center text-white">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Any pontoon or body of water becomes an incredible playground!
          </h1>
          <p className="mt-6 text-lg font-light md:text-xl">
            Developed with our dockstart riders, who were given carte blanche to
            come up with the ultimate dockstart board!
          </p>
        </div>
      </main>

     
    </>
  );
};

export default HeroSection;