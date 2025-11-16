import React from 'react';

export default function HomePage() {
  const imageUrl = "https://afs-foiling.com/wp-content/uploads/2023/11/bottom-2.png";

  return (
    <main className="relative min-h-[200vh] bg-black text-white overflow-x-hidden">
      
      {/* --- Spanning Board Image --- */}
      {/* This is the board. It is positioned absolutely.
        It has 'z-10' (a z-index of 10).
      */}
      <div className="absolute top-0 left-1/2 z-10 h-full w-auto -translate-x-1/2">
        <img
          src={imageUrl}
          alt="AFS Fire V2 Foil Board"
          className="h-full w-auto"
        />
      </div>

      {/* --- Section 1: Hero Text --- */}
      {/* This section has 'z-20', so it appears ON TOP of the image (which is z-10).
      */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center p-8 text-center">
        <div className="max-w-lg">
          <h1 className="mb-6 text-5xl font-bold leading-tight md:text-7xl">
            Fire V2 - Made to push limits.
          </h1>
          <p className="text-lg text-white/90 md:text-xl">
            The AFS team, always at the forefront of innovation, presents the
            AFS Fire, the 100% wing foil board.
          </p>
        </div>
      </section>

      {/* --- Section 2: Split Text (Two Columns) --- */}
      {/* This section ALSO has 'z-20', so it also appears ON TOP of the image.

        To create the TWO COLUMNS, we use a 7-column grid:
        - 3 columns for the left text.
        - 1 column for the empty space (where the board shows through).
        - 3 columns for the right text.
      */}
     <section className="relative z-20 grid min-h-screen w-full grid-cols-9 items-center gap-4 px-8 md:px-20">
        
        {/* Left Text Column */}
        <div className="col-span-4 text-right">
          <p className="text-lg text-white/90 md:text-xl leading-relaxed max-w-md ml-auto">
            If you've already tasted the incredible sensations of this sport and 
            want to continue to progress, these boards will undoubtedly propel 
            you to the next level.
          </p>
        </div>

        {/* Spacer (narrower now to bring text closer) */}
        <div className="col-span-1"></div>

        {/* Right Text Column */}
        <div className="col-span-4 text-left">
          <p className="text-lg text-white/90 md:text-xl leading-relaxed max-w-md mr-auto">
            This year, the shape has been completely revised. A bulb at the front 
            evolves on a step, revealing a magnificent square tail, inspired by 
            the famous Pro 4'5.
          </p>
        </div>
      </section>

    </main>
  );
}