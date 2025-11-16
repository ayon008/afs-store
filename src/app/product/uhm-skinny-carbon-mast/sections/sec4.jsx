// ./components/AfsSuperStiff.jsx

import Image from 'next/image';

export default function AfsSuperStiff() {
  return (
    <section className="relative w-full h-screen bg-black text-white">
      {/* Background Image */}
      <Image
        src="https://afs-foiling.com/wp-content/uploads/2025/09/17820231_SL-092619-23740-39-1-1.png"
        alt="Carbon fiber texture"
        layout="fill" // Fills the parent container
        objectFit="cover" // Covers the entire area, may crop
        priority
        className="opacity-40" // Dim the image to make text readable
      />

      {/* Text Content Overlay */}
      {/* This container ensures text stays on top and is positioned correctly */}
      <div className="relative z-10 h-full p-8 sm:p-16 lg:p-24">
        
        {/* Main Centered Text */}
        {/* Using flex to center this block in the available space */}
        <div className="flex flex-col justify-center items-center h-full text-center max-w-2xl mx-auto">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-8">
            Super stiff
          </h2>
          <p className="text-lg font-bold uppercase tracking-wide mb-4">
            OUR UHM MASTS ARE MADE FROM TOP-OF-THE-RANGE, MULTI-LAYER UHM
            CARBON, GIVING THEM EXCEPTIONAL LIGHTNESS AND RIGIDITY.
          </p>
          <p className="text-lg text-gray-300 font-light">
            In fact, UHM carbon fiber is up to twice as rigid as standard
            carbon fiber. Thanks to these characteristics, we can use fewer
            fibers to achieve greater rigidity, which translates into a
            lighter result.
          </p>
        </div>

        {/* Bottom Right Text */}
        <div className="absolute bottom-12 right-8 sm:right-16 lg:right-24 text-right">
          <p className="text-xs uppercase tracking-wider text-gray-300 max-w-[320px]">
            THE TERM UHM, WHICH STANDS FOR ULTRA HIGH MODULUS, REFERS TO A
            CARBON WITH A HIGHER YOUNG'S MODULUS THAN STANDARD CARBON,
            ENABLING IT TO MAINTAIN ITS SHAPE UNDER STRESS WITHOUT DEFORMING.
          </p>
        </div>
        
      </div>
    </section>
  );
}